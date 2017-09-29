import 'pixi';
import 'p2';
import Phaser from 'phaser';

import WorldBuilder from '../src/world/WorldBuilder';
import CreatureFactory from '../src/factories/CreatureFactory';

// ...
import Hero from '../src/entities/Hero';

// Some test map data
const mapData = {
    enemies: [
        {
            id: 'bug',
            pos: {
                x: 150,
                y: 100
            }
        }
    ]
};

//// TODO: Fix the problem with the relative import urls
//// TODO: Convert to es6
let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function render() {

    // game.debug.bodyInfo(this.hero.activeWeapon, 32, 32);
    // game.debug.body(this.hero.activeWeapon);

    // this.enemies.children.forEach((e) => {
    //     game.debug.bodyInfo(e, 32, 32);
    //     game.debug.body(e);
    // });

}

function preload() {

    game.load.spritesheet('player', 'resources/Game/player.png', 128, 128, 18);
    game.load.image('ground', 'resources/Game/platform tile2.png', 32, 32);

}

function create() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
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
    this.ground = new WorldBuilder(game).makeTest();

    // Make entities
    this.hero = new Hero(game, 700, 100, 'player');
    this.hero.body.setSize(48, 48, 38, 80);

    // Bind some keys
    this.attackKey.onDown.add(function () {
        this.hero.attack();
    }, this);

    // Make enemies and things
    this.enemies = game.add.group();

    // TODO: Consider making the manifests available globally (no point making it complicated)
    let enemies = mapData.enemies.map(function(d){
        return CreatureFactory.make(d.id, d.pos, game);
    });

    enemies.forEach((creatureSprite) => {
        creatureSprite.setTarget(this.hero);
        this.enemies.add(creatureSprite);
    });

}

function update() {

    this.game.physics.arcade.collide(this.hero, this.ground);
    this.game.physics.arcade.collide(this.enemies, this.ground);

    this.game.physics.arcade.overlap(this.hero.activeWeapon, this.enemies, function (weapon, npc) {
        npc.takeDamage(weapon.damageOutput(), {
            x: weapon.x,
            y: weapon.y
        });
    }, null, this);

}