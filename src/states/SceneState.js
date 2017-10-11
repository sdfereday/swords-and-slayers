import 'pixi';
import 'p2';
import Phaser from 'phaser';
import ArcadeSlopes from 'arcadeSlopes';

//// TODO: Fix the problem with the relative import urls
import DSMapData from '../stubs/MapData';
import DSGameData from '../stubs/GameData';
import DSSceneData from '../stubs/SceneData';
import SceneManager from '../scenes/SceneManager';
import WorldBuilder from '../world/WorldBuilder';
import ActorFactory from '../factories/ActorFactory';
import Hero from '../entities/Hero';

/*

Now, the theatre state lifts all input from the user (bar chat text) and cycles through
a preset bunch of actions that either act in parallel or not at all.

It'd be best to store these separate in stubs, but adding them to tree data is probably
the best place to pop them. Obviously a couple of custom ones will be needed.

So to start with, we need the following as a proof of function:
- Two actors walk on to stage
- Start a conversation piece between them (with chat animations)
- When done, one of them runs off to the right, the other has a sad animation

That's pretty much most of it in place. Should also be able to move the camera and such too.
You name it, anyway, have a go.

*/

class TheatreState {

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

        // Startup physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1200; // pixels/second/second
        this.game.physics.arcade.TILE_BIAS = 40; // Prevents strange tile fall-through
        this.game.stage.backgroundColor = '#2d2d2d';

        // Create some ground for the player to walk on (this will be replaced by tilesets and proper parsing later)
        let mapData = DSMapData.find(x => x.id === 'introduction');
        // let world = new WorldBuilder(this.game);
        // world.initializeWorld(mapData.world);

        // Should only be one needed per level so this is ok
        //this.collisionLayer = world.getLayerByProperty('collisionLayer');

        // Make entities
        this.actors = this.game.add.group();
        let actors = mapData.actors.map(function (d) {
            return {
                data: d,
                sprite: ActorFactory.make(d.id, d.pos, this.game)
            };
        }, this);

        actors.forEach((actor) => {
            this.actors.add(actor.sprite);
        });

        // Scene data sequence for this scene
        this.sceneManager = new SceneManager('scene-1');
        this.sceneManager.start({
            actors
        });

        // Bind input key
        this.interactionKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.interactionKey.onDown.add(x => {

            this.sceneManager.next({ actors });

        }, this);

        // Post process anything else that needs doing to the world before game starts (layer sorting, lights, etc),
        // note that this needs to happen 'after' actors are placed so z-indexing works.
        //world.postProcess();

    }

    update() {

        //this.game.physics.arcade.collide(this.actors, this.collisionLayer.phaserLayer);
        this.sceneManager.update();

    }

}

export default TheatreState;