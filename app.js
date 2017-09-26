/// Helpers
let mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {
    constructor(superclass) {
        this.superclass = superclass;
    }

    with(...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
    }
}

class Helpers {

    static Dist(object, target) {

        let a = object.x - target.x;
        let b = object.y - target.y;

        return Math.sqrt(a * a + b * b);

    }

}


/// Components (class-likes)
let UserControlled = (superclass) => class extends superclass {

    //// TODO: Move this lot out of here and in to global. It'll be easier to configure from there.
    // This function should return true when the player activates the "go left" control
    // In this case, either holding the right arrow or tapping or clicking on the left
    // side of the screen.
    leftInputIsActive() {
        let isActive = false;

        isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        isActive |= (this.game.input.activePointer.isDown &&
            this.game.input.activePointer.x < this.game.width / 4);

        return isActive;
    }

    // This function should return true when the player activates the "go right" control
    // In this case, either holding the right arrow or tapping or clicking on the right
    // side of the screen.
    rightInputIsActive() {
        let isActive = false;

        isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
        isActive |= (this.game.input.activePointer.isDown &&
            this.game.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

        return isActive;
    }

    // This function should return true when the player activates the "jump" control
    // In this case, either holding the up arrow or tapping or clicking on the center
    // part of the screen.
    upInputIsActive(duration) {
        let isActive = false;

        isActive = this.game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
        isActive |= (this.game.input.activePointer.justPressed(duration + 1000 / 60) &&
            this.game.input.activePointer.x > this.game.width / 4 &&
            this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4);

        return isActive;
    }

    // This function returns true when the player releases the "jump" control
    upInputReleased() {
        let released = false;

        released = this.game.input.keyboard.upDuration(Phaser.Keyboard.UP);
        released |= this.game.input.activePointer.justReleased();

        return released;
    }

};

/// Entities
class Hero extends mix(Phaser.Sprite).with(UserControlled) {

    constructor(game, x, y, name) {

        // Phaser requires all of these to happen
        super(game, x, y, name);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        // Custom stats and things
        this.id = "???";
        this.name = name;

        this.stats = {
            hp: 4,
            maxHp: 4
        };

        this.config = {
            movementSpeed: 200
        };

        /////
        this.MAX_SPEED = 500; // pixels/second
        this.ACCELERATION = 1500; // pixels/second/second
        this.DRAG = 600; // pixels/second
        this.GRAVITY = 2600; // pixels/second/second
        this.JUMP_SPEED = -700; // pixels/second (negative y is up)

        // Make player collide with world boundaries so he doesn't leave the stage
        this.body.collideWorldBounds = true;

        // Set player minimum and maximum movement speed
        this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

        // Add drag to the player that slows them down when they are not accelerating
        this.body.drag.setTo(this.DRAG, 0); // x, y

        // Since we're jumping we need gravity
        game.physics.arcade.gravity.y = this.GRAVITY;

        // Flag to track if the jump button is pressed
        this.jumping = false;

    }

    update() {

        if (this.leftInputIsActive()) {
            // If the LEFT key is down, set the player velocity to move left
            //this.body.acceleration.x = -this.ACCELERATION;
            this.body.velocity.x = -this.ACCELERATION;
        } else if (this.rightInputIsActive()) {
            // If the RIGHT key is down, set the player velocity to move right
            //this.body.acceleration.x = this.ACCELERATION;
            this.body.velocity.x = this.ACCELERATION;
        } else {
            this.body.velocity.x = 0;
        }

        // Set a variable that is true when the player is touching the ground
        var onTheGround = this.body.touching.down;

        // If the player is touching the ground, let him have 2 jumps
        if (onTheGround) {
            this.jumps = 2;
            this.jumping = false;
        }

        // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
        if (this.jumps > 0 && this.upInputIsActive(150)) {
            this.body.velocity.y = this.JUMP_SPEED;
            this.jumping = true;
        }

        // Reduce the number of available jumps if the jump input is released
        if (this.jumping && this.upInputReleased()) {
            this.jumps--;
            this.jumping = false;
        }

    }

}

class Enemy extends Phaser.Sprite {

    constructor(game, x, y, name) {

        // Phaser requires all of these to happen
        super(game, x, y, name);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        // Custom stats and things
        this.id = "???";
        this.name = name;

        this.stats = {
            hp: 4,
            maxHp: 4
        };

        this.config = {
            movementSpeed: 200,
            alertRange: 200
        };

        this.currentTarget = null;

        // There should probably be only one tree instance, not one per entity
        this.blackboard = new b3.Blackboard();
        this.tree = new b3.BehaviorTree();

        // https://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php
        // http://behavior3js.guineashots.com/ -> When all children return true, priority will run on that parent
        // Out of range would be better as a decorator.
        // You can load all this from JSON ultimately (see docs above)
        this.tree.root = new b3.Priority({
            children: [
                new b3.Sequence({
                    children: [
                        new OutOfRange(),
                        new Idle()
                    ]
                }),
                new b3.Sequence({
                    children: [
                        new InRange(),
                        new Follow()
                    ]
                })
            ]
        });

    }

    update() {

        this.body.velocity.x = 0;

        this.tree.tick(this, this.blackboard);

        if (this.currentTarget) {
            let dist = Helpers.Dist(this, this.currentTarget);
            this.blackboard.set('inRangeOfTarget', dist < this.config.alertRange);
        }

    }

    chaseTarget() {

        let dirToTarget = this.blackboard.get('currentTarget').x > this.x ? 1 : -1;
        this.move(dirToTarget);

    }

    move(dir) {

        if (Helpers.Dist(this, this.currentTarget) < 5)
            return;

        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;

    }

    setTarget(t) {

        this.currentTarget = t;
        this.blackboard.set('currentTarget', this.currentTarget);

    }

    takeDamage(n, origin) {

        console.log(this.name + " is taking damage: " + n);
        console.log(origin + " was origin of damage.");

    }

}

class Weapon extends Phaser.Sprite {

    constructor(game, x, y, name) {

        super(game, x, y, name);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.id = "???";
        this.name = name;
        this.body.allowGravity = false;
        this.body.enable = false;
        this.alpha = 0;

        // You can override this
        this.stats = {
            damageOutput: 1
        };

    }

    damageOutput() {
        return this.stats.damageOutput;
    }

    use() {
        
        // TODO: To clean up properly. :P
        if (this.body.enabled)
            return;
        
            this.body.enable = true;
        this.alpha = 1;
        
        let self = this;
        setTimeout(function () {
            self.body.enable = false;
            self.alpha = 0;
        }, 100);

    }

}

/// Game world
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