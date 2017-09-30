import mix from '../helpers/Mix';
import Helpers from '../helpers/Helpers';

// Equipment
import Weapon from '../entities/Weapon';

// Actions
import Idle from '../ai/nodes/actions/Idle';
import Follow from '../ai/nodes/actions/Follow';
import Attack from '../ai/nodes/actions/Attack';
import Roam from '../ai/nodes/actions/Roam';
import RandomWait from '../ai/nodes/actions/RandomWait';

// Composites
import SequenceSynced from '../ai/nodes/composites/SequenceSynced';

// Conditions
import InRange from '../ai/nodes/conditions/InRange';
import InAttackRange from '../ai/nodes/conditions/InAttackRange';

// Decorators
import BoolCheck from '../ai/nodes/decorators/BoolCheck';

// Effects
import Animator from '../animation/Animator';
import HitEffects from '../components/HitEffects';

class Enemy extends mix(Phaser.Sprite).with(HitEffects) {

    constructor(game, x, y, name, data) {

        // Phaser requires all of these to happen
        super(game, x, y, name);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        // Custom data for this entity (fixed as this, should be deterministic)
        this.config = {};
        this.stats = {};
        this.equipment = {};
        this.activeWeapon = {};

        // Define properties with supplied data (TODO: Revise method)
        if (data) {
            Object.defineProperties(this, data);
        }

        // Important to enemies
        this.currentTarget = null;

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

        // Since enemy gets added to a group, and so does active weapon, you can't 'add child'
        // a sprite to a sprite in phaser as it's become a child of another group. So this has to be done instead sadly:
        this.activeWeapon.anchorTo(this.x, this.y + (this.activeWeapon.height));

        if (!this.disabled || this.disabled && this.body.velocity.y === 0)
            this.body.velocity.x = 0;

        if (!this.busy)
            this.tree.tick(this, this.blackboard);

        if (this.currentTarget) {
            let d = Helpers.distance(this, this.currentTarget);
            this.blackboard.set('inRangeOfTarget', d < this.config.alertRange);
            this.blackboard.set('inRangeOfAttack', d < this.config.attackRange);
        }

        // Play looped anims
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

    initializeAI() {

        // There should probably be only one tree instance, not one per entity
        this.blackboard = new b3.Blackboard();
        this.tree = new b3.BehaviorTree();

        // https://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php
        // http://behavior3js.guineashots.com/ -> When all children return true, priority will run on that parent, 
        // order matters with this one I think.
        // Out of range would be better as a decorator.
        // You can load all this from JSON ultimately (see docs above)
        this.tree.root = new b3.Priority({
            children: [
                new BoolCheck('inRangeOfAttack', {
                    child: new Attack()
                }),
                new BoolCheck('inRangeOfTarget', {
                    child: new Follow()
                }),
                new SequenceSynced({
                    children: [
                        new Roam(true),
                        new RandomWait()
                    ]
                })
            ]
        });

        return this;

    }

    /// Automatic Movement ///
    move(dir) {

        if (Helpers.distance(this, this.currentTarget) < this.width / 3 || this.disabled || this.targetWithinBounds())
            return;

        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;

        this.scale.setTo(dir, 1);
        this.activeWeapon.scale.setTo(dir, 1);

    }

    moveTo(pos) {

        if (this.disabled)
            return;

        let dir = Helpers.getTargetDirection(pos.x, this.x);

        // TODO: Might be nice to have a walking anim too.
        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;

        this.scale.setTo(dir, 1);
        this.activeWeapon.scale.setTo(dir, 1);

    }

    stop() {

        this.body.velocity.x = 0;

    }

    /// Targeting ///
    faceTarget(pos) {

        let dir = Helpers.getTargetDirection(pos.x, this.x);

        this.scale.setTo(dir, 1);
        this.activeWeapon.scale.setTo(dir, 1);

    }

    targetWithinBounds() {

        // Checks if the current target is within a good enough 'x' zone to prevent left-right shift (might need 'y' in future)
        return this.currentTarget && (this.currentTarget.x > this.x - (this.width / 3) && this.currentTarget.x < this.x + (this.width / 3));

    }

    setTarget(t) {

        this.currentTarget = t;
        this.blackboard.set('currentTarget', this.currentTarget);

    }

    /// Actions ////
    chaseTarget() {

        this.move(Helpers.getTargetDirection(this.blackboard.get('currentTarget').x, this.x));

    }

    attackTarget() {

        if (this.disabled || this.busy)
            return;

        this.faceTarget(this.currentTarget);

        this.busy = true;
        this.priorityAnimation = true;

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

        console.log(this.name + " is taking damage: " + n);
        console.log(origin, "was origin of damage.");

        // Some cheeky knockback
        this.body.velocity.x = Helpers.getTargetDirection(this.blackboard.get('currentTarget').x, this.x) * -300;
        this.body.velocity.y = -300;

        this.damageFlash();

    }

    /// Animations ///
    registerAnimations(data) {

        this.animator.registerMany(data);
        return this;

    }

    animate() {

        if (this.disabled)
            return;

        // Movement
        if (this.body.velocity.x != 0) {
            this.animator.play('run');
        } else {
            this.animator.play('idle');
        }

    }

}

export default Enemy;