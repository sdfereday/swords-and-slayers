import mix from '../helpers/Mix';
import Helpers from '../helpers/Helpers';
import BaseEntity from '../entities/BaseEntity';
import InputManager from '../components/InputManager';
import AttachedWeapon from '../components/AttachedWeapon';
import HitEffects from '../components/HitEffects';

class Hero extends mix(BaseEntity).with(InputManager, HitEffects, AttachedWeapon) {

    constructor(game, x, y, name, data) {

        super(game, x, y, name, data);

        this.body.collideWorldBounds = true;

        this.jumps = 2;
        this.jumping = false;

        this.initManualInput();

    }

    update() {

        if(this.activeWeapon)
            this.activeWeapon.anchorTo(this.x, this.y + (this.activeWeapon.height));

        if (this.disabled && !this.body.touching.down)
            return;

        if (this.disabled && this.justGotHit && this.body.touching.down) {
            this.justGotHit = false;
            return;
        }

        this.inputUpdate();
        //this.animate();

    }

    /// Manual Input ///
    inputUpdate(inputType) {

        this.resetMovement(); 

        if (this.leftInputIsActive()) {
            this.body.velocity.x += -this.config.movementSpeed;
            this.correctScale(-1);
        } else if (this.rightInputIsActive()) {
            this.body.velocity.x += this.config.movementSpeed;
            this.correctScale(1);
        }console.log(this.body);

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

        this.justGotHit = false;

        console.log(this.name + " is taking damage: " + n);
        console.log(origin, "was origin of damage.");

        this.activeWeapon.disable();

        // Some cheeky knockback
        this.body.velocity.x = Helpers.getTargetDirection(origin.x, this.x) * -300;
        this.body.velocity.y = -300;

        this.damageFlash();

    }

    /// Animations ///
    animate() {

        // Jumping
        if (!this.body.touching.down) {

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