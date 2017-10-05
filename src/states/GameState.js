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

        //this.game.debug.bodyInfo(this.hero, 32, 32);
        //this.game.debug.body(this.hero);

        // this.game.debug.bodyInfo(this.hero.activeWeapon, 32, 32);
        // this.game.debug.body(this.hero.activeWeapon);

        // this.enemies.children.forEach((e) => {
        //     this.game.debug.bodyInfo(e.activeWeapon, 32, 32);
        //     this.game.debug.body(e.activeWeapon);
        // });

    }

    preload() {

        this.game.load.spritesheet('player', 'resources/Game/player.png', 128, 128, 20);
        this.game.load.spritesheet('enemy', 'resources/Game/enemy.png', 128, 128, 20);
        this.game.load.image('ground', 'resources/Game/platform tile2.png', 32, 32);

        // https://phaser.io/examples/v2/loader/load-tilemap-json
        this.game.load.tilemap('level-tilemap', 'resources/Game/maps/world-sheet.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('world-atlas', 'resources/Tiles/world-sheet.png');
        this.game.load.image('col-atlas', 'resources/Tiles/col.png');
        
        //...
        this.game.load.image('slope-atlas', 'resources/Tiles/arcade-slopes-64.png');

    }

    create() {

        // Load plugins
        this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);

        // Startup physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 2500; // pixels/second/second
        this.game.physics.arcade.TILE_BIAS = 40; // Prevents strange tile fall-through

        this.game.stage.backgroundColor = '#2d2d2d';

        // Create some ground for the player to walk on (this will be replaced by tilesets and proper parsing later)
        let mapData = DSMapData.find(x => x.id === 'testlevel');
        let world = new WorldBuilder(this.game, {
            tilemap: 'level-tilemap',
            layers: [
                {
                    name: 'world-sheet',
                    cacheName: 'world-atlas',
                    worldSizeLayer: true
                },
                {
                    name: 'collidable',
                    cacheName: 'col-atlas',
                    collisionLayer: true
                }
            ]
        });

        // Should only be one needed per level so this is ok
        this.collisionLayer = world.getCollisionLayer();

        // Make entities
        this.hero = new Hero(this.game, 250, 700, DSGameData.player.sprite, {
            config: DSGameData.player.config,
            stats: DSGameData.player.stats,
            equipment: DSGameData.player.equipment
        });

        this.hero.attachWeapon(DSGameData.weapons.find(x => x.id === DSGameData.player.equipment.value.primaryWeapon));
        this.hero.setBody(DSGameData.player.body);

        if (DSGameData.player.animations && this.hero.animator)
            this.hero.animator.registerMany(DSGameData.player.animations);

        // Make enemies and things
        this.enemies = this.game.add.group();
        this.enemyWeapons = this.game.add.group();

        // TODO: Consider making the manifests available globally (no point making it complicated)
        let enemies = mapData.enemies.map(function (d) {
            //return CreatureFactory.make(d.id, d.pos, this.game);
        }, this);

        // enemies.forEach((creatureSprite) => {
        //     creatureSprite.setTarget(this.hero);
        //     this.enemies.add(creatureSprite);
        //     if (creatureSprite.activeWeapon)
        //         this.enemyWeapons.add(creatureSprite.activeWeapon);
        // });

        // Finally, enable camera
        this.game.camera.follow(this.hero, Phaser.Camera.FOLLOW_TOPDOWN);

        /////
        //https://github.com/hexus/phaser-arcade-slopes
        // Experimental (slopes)
        let map = world.gameTileMap;

        map.addTilesetImage('arcade-slopes-64', 'slope-atlas');
        this.game.slopes.convertTilemapLayer(this.collisionLayer, 'arcadeslopes', 14);
        this.game.slopes.enable(this.hero);

        this.collisionLayer.debug = true;

    }

    update() {

        this.game.physics.arcade.collide(this.hero, this.collisionLayer);
        this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

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