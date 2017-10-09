import mix from '../helpers/Mix';
import Helpers from '../helpers/Helpers';
import BaseEntity from '../entities/BaseEntity';
import Behaviours from '../ai/Behaviours';
import AttachedWeapon from '../components/AttachedWeapon';
import HitEffects from '../components/HitEffects';

class Enemy extends mix(BaseEntity).with(HitEffects, AttachedWeapon) {

    constructor(game, x, y, name, data) {

        super(game, x, y, name, data);

        this.body.collideWorldBounds = true;

        if (this.config.behaviourId)
            this.behaviours = new Behaviours(this.config.behaviourId);

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

        this.resetMovement();

        if (!this.busy)
            this.behaviours.update(this);

        if (this.currentTarget) {
            let d = Helpers.distance(this, this.currentTarget);
            this.behaviours.setVariable('inRangeOfTarget', d < this.config.alertRange);
            this.behaviours.setVariable('inRangeOfAttack', d < this.config.attackRange);
        }

        //this.animate();

    }

    /// AI Movement ///
    move(dir) {

        if (Helpers.distance(this, this.currentTarget) < this.width / 3 || this.disabled || Helpers.targetWithinBounds(this.currentTarget, this, this.width / 3))
            return;

        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;
        this.correctScale(dir);

    }

    moveTo(pos) {

        if (this.disabled)
            return;

        let dir = Helpers.getTargetDirection(pos.x, this.x);

        // TODO: Might be nice to have a walking anim too.
        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;
        this.correctScale(dir);

    }

    /// AI Actions ////
    setTarget(t) {

        // Be careful with this and the GC. Multiple references can be damaging.
        this.currentTarget = t;
        this.behaviours.setVariable('currentTarget', t);

    }

    chaseTarget() {

        this.move(Helpers.getTargetDirection(this.currentTarget.x, this.x));

    }

    attackTarget() {

        if (this.disabled || this.busy)
            return;

        this.faceTarget(this.currentTarget);

        this.busy = true;

        // TODO: Remove magic numbers
        let currentAnim = this.animator.getAnimation('attack'),
            attackStartDelay = Helpers.getRandomInt(200, 500),
            attackEndDelay = Helpers.getRandomInt(200, 500);

        this.game.time.events.add(attackStartDelay, () => {

            // We don't play the animation 'until' the attack starts :P
            this.animator.play('attack');

            this.activeWeapon.use(Helpers.animDuration(currentAnim.speed, currentAnim.frameTotal), () => {

                this.game.time.events.add(attackEndDelay, () => {
                    this.busy = false;
                }, this);

            });

        }, this);

    }

    /// Feedback ///
    takeDamage(n, origin) {

        if (this.disabled)
            return;

        this.justGotHit = true;

        console.log(this.name + " is taking damage: " + n);
        console.log(origin, "was origin of damage.");

        // Important otherwise you might run in to 'ghost' weapons
        this.activeWeapon.disable();

        // Some cheeky knockback
        this.body.velocity.x = Helpers.getTargetDirection(this.currentTarget.x, this.x) * -500;
        this.body.velocity.y = -500;

        this.damageFlash();

    }

    /// Animations ///
    animate() {

        // Movement
        if (this.body.velocity.x != 0) {
            this.animator.play('run');
        } else {
            this.animator.play('idle');
        }

    }

}

export default Enemy;