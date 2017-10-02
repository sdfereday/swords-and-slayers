import 'pixi';
import 'p2';
import Phaser from 'phaser';

//// TODO: Fix the problem with the relative import urls
import DSMapData from '../stubs/MapData';
import DSGameData from '../stubs/GameData';
import WorldBuilder from '../world/WorldBuilder';
import CreatureFactory from '../factories/CreatureFactory';
import Hero from '../entities/Hero';

class GameState {

    render() {

        // game.debug.bodyInfo(this.hero.activeWeapon, 32, 32);
        // game.debug.body(this.hero.activeWeapon);

        // this.enemies.children.forEach((e) => {
        //     game.debug.bodyInfo(e, 32, 32);
        //     game.debug.body(e.activeWeapon);
        // });

    }

    preload() {

        this.game.load.spritesheet('player', 'resources/Game/player.png', 128, 128, 20);
        this.game.load.spritesheet('enemy', 'resources/Game/enemy.png', 128, 128, 20);
        this.game.load.image('ground', 'resources/Game/platform tile2.png', 32, 32);

    }

    create() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 2000; // pixels/second/second

        this.game.stage.backgroundColor = '#2d2d2d';

        // Capture certain keys to prevent their default actions in the browser.
        // This is only necessary because this is an HTML5 game. Games on other
        // platforms may not need code like this.
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

        // Create some ground for the player to walk on (this will be replaced by tilesets and proper parsing later)
        let mapData = DSMapData.find(x => x.id === 'testlevel');
        this.ground = new WorldBuilder(this.game).makeTest();

        // Make entities
        this.hero = new Hero(this.game, 700, 100, DSGameData.player.sprite, {
            config: DSGameData.player.config,
            stats: DSGameData.player.stats,
            equipment: DSGameData.player.equipment
        });

        this.hero.attachWeapon(DSGameData.weapons.find(x => x.id === DSGameData.player.equipment.value.primaryWeapon));
        this.hero.setBody(DSGameData.player.body);

        if (DSGameData.player.animations && this.hero.animator)
            this.hero.animator.registerMany(DSGameData.player.animations);

        // Bind some keys
        this.attackKey.onDown.add(function () {
            this.hero.attack();
        }, this);

        // Make enemies and things
        this.enemies = this.game.add.group();
        this.enemyWeapons = this.game.add.group();

        // TODO: Consider making the manifests available globally (no point making it complicated)
        let enemies = mapData.enemies.map(function (d) {
            return CreatureFactory.make(d.id, d.pos, this.game);
        }, this);

        enemies.forEach((creatureSprite) => {
            creatureSprite.setTarget(this.hero);
            this.enemies.add(creatureSprite);
            if (creatureSprite.activeWeapon)
                this.enemyWeapons.add(creatureSprite.activeWeapon);
        });

    }

    update() {

        this.game.physics.arcade.collide(this.hero, this.ground);
        this.game.physics.arcade.collide(this.enemies, this.ground);

        this.game.physics.arcade.overlap(this.hero.activeWeapon, this.enemies, function (weapon, npc) {
            npc.takeDamage(weapon.damageOutput(), {
                x: weapon.x,
                y: weapon.y
            });
        }, null, this);

        this.game.physics.arcade.overlap(this.hero, this.enemyWeapons, function (hero, weapon) {
            hero.takeDamage(weapon.damageOutput(), {
                x: weapon.x,
                y: weapon.y
            });
        }, null, this);

    }


}

export default GameState;