import 'pixi';
import 'p2';
import Phaser from 'phaser';

// TODO: Move to factories
import Hero from '../src/entities/Hero';
import Enemy from '../src/entities/Enemy';
import Weapon from '../src/entities/Weapon';

//// TODO: Fix the problem with the relative import urls
//// TODO: Convert to es6
let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function render() {

    game.debug.bodyInfo(this.hero, 32, 32);
    game.debug.body(this.hero);

}

function preload() {

    game.load.spritesheet('player', 'resources/Game/player.png', 128, 128, 18);
    game.load.image('ground', 'resources/Game/platform tile2.png', 32, 32);
    // game.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);

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

    this.attackKey.onDown.add(function () {
        this.activeWeapon.use();
    }, this);

    // Create some ground for the player to walk on
    this.ground = this.game.add.group();
    for (var x = 0; x < this.game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }

    this.hero = new Hero(game, 120, 100, 'player');
    this.hero.frame = 1;

    this.hero.body.setSize(48, 48, 48, 80);

    // Weapons attach to the player, but we make a reference here (easier to deal with)
    let heroCenter = {
        x: (this.hero.x / 2),
        y: (this.hero.y / 2)
    }

    this.activeWeapon = new Weapon(game, heroCenter.x, heroCenter.y, 'weapon-gfx');
    this.hero.addChild(this.activeWeapon);

    this.activeWeapon.x += this.activeWeapon.width;
    this.activeWeapon.y += this.activeWeapon.height;

    // This risks getting messy, just ensure that stuff is separated out per thing it does.
    this.enemies = game.add.group();
    let enemy = new Enemy(game, 90, 100, 'player');
    this.enemies.add(enemy);

    enemy.setTarget(this.hero);

}

function update() {

    this.game.physics.arcade.collide(this.hero, this.ground);
    this.game.physics.arcade.collide(this.enemies, this.ground);

    this.game.physics.arcade.overlap(this.activeWeapon, this.enemies, function (weapon, npc) {
        npc.takeDamage(weapon.damageOutput(), {
            x: weapon.x,
            y: weapon.y
        });
    }, null, this);

}