import mix from '../helpers/Mix';
import Helpers from '../helpers/Helpers';
import UserControlled from '../components/UserControlled';
import Weapon from '../entities/Weapon';

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

        // Set the anchor
        this.anchor.x = 0.5;

        // Need to revise how to do this
        this.activeWeapon = new Weapon(game, this.x / 2, this.y / 2, 'weapon-gfx');
        this.addChild(this.activeWeapon);

        this.activeWeapon.x -= this.activeWeapon.width;
        this.activeWeapon.y += this.activeWeapon.height;

        // Finally add those animations that we all love and enjoy
        let idleAnim = this.animations.add('idle', Helpers.numberArray(3, 6), 3, true);
        let runAnim = this.animations.add('run', Helpers.numberArray(12, 18), 12, true);
        let attackAnim = this.animations.add('attack', Helpers.numberArray(1, 3), 10, false);
        let jumpAttackAnim = this.animations.add('jumpAttack', Helpers.numberArray(1, 2), 8, false);
        let jumpAnim = this.animations.add('jump', [7], 8, false);
        let fallAnim = this.animations.add('fall', [7], 8, false);

        // This will make sure looped animations don't get in the way (experimental)
        this.priorityAnimation = false;

        // Anim events (pretty useful)
        attackAnim.onComplete.add(this.onAnimationStopped, this);
        jumpAttackAnim.onComplete.add(this.onAnimationStopped, this);

    }

    update() {

        if (this.leftInputIsActive()) {
            this.body.velocity.x = -this.ACCELERATION;
            this.scale.setTo(-1, 1);
        } else if (this.rightInputIsActive()) {
            this.body.velocity.x = this.ACCELERATION;
            this.scale.setTo(1, 1);  
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

        // Play looped anims
        if(!this.priorityAnimation)
            this.animateContinuous();

    }

    attack() {

        let currentAnim = null;

        if(this.body.velocity.y != 0) {
            currentAnim = this.animations.play('jumpAttack');
        } else {
            currentAnim = this.animations.play('attack');
        }

        this.priorityAnimation = true;

        this.activeWeapon.use(Helpers.animDuration(currentAnim.speed, currentAnim.frameTotal));

    }

    animateContinuous() {

        // Jumping
        if(this.body.velocity.y != 0) {
            
            if(this.body.velocity.y > 0) {
                this.animations.play('jump');
            } else {
                this.animations.play('fall');
            }

            return;

        }

        // Movement
        if(this.body.velocity.x != 0) {
            this.animations.play('run');
        } else {
            this.animations.play('idle');
        }
       
    }

    onAnimationStopped() {

        this.priorityAnimation = false;

    }

}

export default Hero;