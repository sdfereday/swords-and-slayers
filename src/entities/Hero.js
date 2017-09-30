import mix from '../helpers/Mix';
import Helpers from '../helpers/Helpers';
import UserControlled from '../components/UserControlled';
import Weapon from '../entities/Weapon';

// Effects
import Animator from '../animation/Animator';
import HitEffects from '../components/HitEffects';

class Hero extends mix(Phaser.Sprite).with(UserControlled, HitEffects) {

    constructor(game, x, y, name, data, animationsData) {

        // Phaser requires all of these to happen
        super(game, x, y, name);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        // Custom data to expect for this entity
        this.config = {};
        this.stats = {};
        this.equipment = {};
        this.activeWeapon = {};

        // Define properties with supplied data (TODO: Revise method)
        if (data) {
            Object.defineProperties(this, data);
        }

        // Make player collide with world boundaries so he doesn't leave the stage
        this.body.collideWorldBounds = true;

        // Flags
        this.busy = false;
        this.disabled = false;
        this.jumping = false;

        // Set the anchor
        this.anchor.x = 0.5;

        // Animations setup
        this.animator = new Animator(this.animations);

    }

    update() {

        if (this.disabled)
            return;

        this.activeWeapon.anchorTo(this.x, this.y + (this.activeWeapon.height));

        if (this.leftInputIsActive()) {
            this.body.velocity.x = -this.config.movementSpeed;
            this.scale.setTo(-1, 1);
            this.activeWeapon.scale.setTo(-1, 1);
        } else if (this.rightInputIsActive()) {
            this.body.velocity.x = this.config.movementSpeed;
            this.scale.setTo(1, 1);
            this.activeWeapon.scale.setTo(1, 1);
        } else {
            this.body.velocity.x = 0;
        }

        // If the player is touching the ground, let him have 2 jumps
        if (this.body.touching.down) {
            this.jumps = 2;
            this.jumping = false;
        }

        // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
        if (this.jumps > 0 && this.upInputIsActive(150)) {
            this.body.velocity.y = this.config.jumpSpeed;
            this.jumping = true;
        }

        // Reduce the number of available jumps if the jump input is released
        if (this.jumping && this.upInputReleased()) {
            this.jumps--;
            this.jumping = false;
        }

        // Play entity anims
        this.animate();

    }

    // TODO: All below can be moved in to components
    /// Data setup and init ///
    setWeapon(weaponData) {

        // Need to revise how to do this
        this.activeWeapon = new Weapon(this.game, 0, 0, 'weapon-gfx');
        this.activeWeapon.y += this.activeWeapon.height;

        // This is only temporary
        this.activeWeapon.body.setSize(48, 64, 32, 32);

        return this;

    }

    setBody(bodyData) {

        this.body.setSize(bodyData.x, bodyData.y, bodyData.w, bodyData.h);
        return this;

    }

    /// Actions ///
    attack() {

        // Sometimes returns null, not sure why...
        let currentAnim = this.animator.play('attack');

        if (currentAnim)
            this.activeWeapon.use(Helpers.animDuration(currentAnim.speed, currentAnim.frameTotal));

    }

    /// Feedback ///
    takeDamage(n, origin) {

        if (this.disabled)
            return;

        console.log(this.name + " is taking damage: " + n);
        console.log(origin, "was origin of damage.");

        // Some cheeky knockback
        this.body.velocity.x = Helpers.getTargetDirection(origin.x, this.x) * -300;
        this.body.velocity.y = -300;

        this.damageFlash();

    }

    /// Animations ///
    registerAnimations(data) {

        this.animator.registerMany(data);
        return this;

    }

    animate() {

        // Jumping
        if (this.body.velocity.y !== 0) {

            if (this.body.velocity.y < 0) {
                this.animator.play('jump');
            } else {
                this.animator.play('fall');
            }

            return;

        }

        // Movement
        if (this.body.velocity.x !== 0) {
            this.animator.play('run');
        } else {
            this.animator.play('idle');
        }

    }

}

export default Hero;