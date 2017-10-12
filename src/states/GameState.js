import 'pixi';
import 'p2';
import Phaser from 'phaser';
import ArcadeSlopes from 'arcadeSlopes';

//// TODO: Fix the problem with the relative import urls
import DSMapData from '../stubs/MapData';
import DSGameData from '../stubs/GameData';
import WorldBuilder from '../world/WorldBuilder';
import CreatureFactory from '../factories/CreatureFactory';
import Hero from '../entities/Hero';

class GameState {

    init(params) {

        // Because you 'might' want to load the same map but run a different scene, we keep
        // the two separated.
        console.log("State change params:", params);
        this.sceneData = params;

    }

    render() {

        //this.game.debug.bodyInfo(this.hero, 32, 32);
        this.game.debug.body(this.hero);

        // this.game.debug.bodyInfo(this.hero.activeWeapon, 32, 32);
        // this.game.debug.body(this.hero.activeWeapon);

        // this.enemies.children.forEach((e) => {
        //     this.game.debug.bodyInfo(e.activeWeapon, 32, 32);
        //     this.game.debug.body(e.activeWeapon);
        // });

    }

    preload() {

        // scale the game 4x
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(6, 6);

        // enable crisp rendering
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        // this.game.load.spritesheet('player', 'resources/Game/player.png', 128, 128, 20);
        // this.game.load.spritesheet('enemy', 'resources/Game/enemy.png', 128, 128, 20);

        /// ...
        this.game.load.image('bg', 'resources/Game/background.png', 256, 124);

        /// ...
        this.game.load.spritesheet('waters', 'resources/Game/waterfall.png', 16, 16);
        this.game.load.spritesheet('watersrp', 'resources/Game/waterfall-rp.png', 16, 16);

        /// ...
        this.game.load.image('player', 'resources/Game/player-lr.png', 16, 16);
        this.game.load.image('enemy', 'resources/Game/enemy-lr.png', 16, 16);

        // https://phaser.io/examples/v2/loader/load-tilemap-json
        this.game.load.tilemap('level-tilemap', 'resources/Game/maps/world-sheet.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('world-atlas', 'resources/Tiles/world-sheet.png');
        this.game.load.image('col-atlas', 'resources/Tiles/arcade-slopes-16.png');

    }

    create() {

        // Tests
        this.tileSprite = this.game.add.sprite(0, 0, 'bg'); // Consider using as a bitmap instead, far less overhead since it's just a bg
        this.tileSprite.fixedToCamera = true;

        this.waterfalltop = this.game.add.tileSprite(16 * 10, 16 * 12, 16 * 4, 16 * 1, 'waters');
        this.waterfalltop.animations.add('wt1');
        this.waterfalltop.animations.play('wt1', 8, true);

        this.waterfall = this.game.add.tileSprite(16 * 10, 16 * 13, 16 * 4, 16 * 9, 'watersrp');
        this.waterfall.animations.add('wt1');
        this.waterfall.animations.play('wt1', 8, true);

        // Load plugins
        this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);

        // Startup physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1200; // pixels/second/second
        this.game.physics.arcade.TILE_BIAS = 40; // Prevents strange tile fall-through

        this.game.stage.backgroundColor = '#2d2d2d';

        // Create some ground for the player to walk on (this will be replaced by tilesets and proper parsing later)
        let mapData = DSMapData.find(x => x.id === this.sceneData.useMapId);
        let world = new WorldBuilder(this.game);
        world.initializeWorld(mapData.world);

        // Should only be one needed per level so this is ok
        this.collisionLayer = world.getLayerByProperty('collisionLayer');

        // Make entities
        this.hero = new Hero(this.game, 0, 0, DSGameData.player.sprite, {
            config: DSGameData.player.config,
            stats: DSGameData.player.stats,
            equipment: DSGameData.player.equipment
        });

        //this.hero.attachWeapon(DSGameData.weapons.find(x => x.id === DSGameData.player.equipment.value.primaryWeapon));
        //this.hero.setBody(DSGameData.player.body);

        // You must call this after any body size modifications have been made
        world.enableSlopesFor(this.hero);

        if (DSGameData.player.animations && this.hero.animator)
            this.hero.animator.registerMany(DSGameData.player.animations);

        // Make enemies and things
        this.enemies = this.game.add.group();
        this.enemyWeapons = this.game.add.group();

        // TODO: Consider making the manifests available globally (no point making it complicated)
        // let enemies = mapData.enemies.map(function (d) {
        //     return CreatureFactory.make(d.id, d.pos, this.game);
        // }, this);

        // enemies.forEach((creatureSprite) => {
        //     world.enableSlopesFor(creatureSprite);
        //     creatureSprite.setTarget(this.hero);
        //     this.enemies.add(creatureSprite);
        //     if (creatureSprite.activeWeapon)
        //         this.enemyWeapons.add(creatureSprite.activeWeapon);
        // });

        // Post process anything else that needs doing to the world before game starts (layer sorting, lights, etc),
        // note that this needs to happen 'after' entities are placed so z-indexing works.
        world.postProcess();

        // Finally, enable camera
        this.game.camera.follow(this.hero, Phaser.Camera.FOLLOW_TOPDOWN);

    }

    update() {

        this.game.physics.arcade.collide(this.hero, this.collisionLayer.phaserLayer);
        this.game.physics.arcade.collide(this.enemies, this.collisionLayer.phaserLayer);

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