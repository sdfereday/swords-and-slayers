// Helpers
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

class Enemy extends Phaser.Sprite {

    constructor(game, x, y, name) {

        // Phaser requires all of these to happen
        super(game, x, y, name);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        // Custom data for this entity (fixed as this, should be deterministic)
        this.config = {};
        this.stats = {};
        this.equipment = {};
        this.activeWeapon = {};

        // These persist across all entities
        this.currentTarget = null;
        this.busy = false;
        this.disabled = false;

        // Set the anchor
        this.anchor.x = 0.5;

        // Initialize some animations
        let idleAnim = this.animations.add('idle', Helpers.numberArray(3, 6), 3, true);
        let runAnim = this.animations.add('run', Helpers.numberArray(12, 18), 12, true);
        let attackAnim = this.animations.add('attack', Helpers.numberArray(1, 3), 10, false);

        // This will make sure looped animations don't get in the way (experimental)
        this.priorityAnimation = false;

        // Anim events (pretty useful)
        attackAnim.onComplete.add(this.onAnimationStopped, this);

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
        if (!this.priorityAnimation)
            this.animateContinuous();

    }

    // TODO: All below can be moved in to components
    setData(data) {

        Object.defineProperties(this, data);
        return this;

    }

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

    chaseTarget() {

        this.move(this.getTargetDirection(this.blackboard.get('currentTarget').x));

    }

    attackTarget() {

        if (this.disabled || this.busy)
            return;

        this.busy = true;
        this.priorityAnimation = true;

        // TODO: Remove magic numbers
        let currentAnim = this.animations.getAnimation('attack'),
            attackStartDelay = Helpers.getRandomInt(200, 500),
            attackEndDelay = Helpers.getRandomInt(200, 500);

        this.game.time.events.add(attackStartDelay, () => {

            // We don't play the animation 'until' the attack starts :P
            currentAnim.play();

            this.activeWeapon.use(Helpers.animDuration(currentAnim.speed, currentAnim.frameTotal), () => {

                this.game.time.events.add(attackEndDelay, () => {
                    this.busy = false;                    
                }, this);

            });

        }, this);

    }

    move(dir) {

        if (Helpers.distance(this, this.currentTarget) < this.width / 3 || this.disabled)
            return;

        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;

        this.scale.setTo(dir, 1);
        this.activeWeapon.scale.setTo(dir, 1);

    }

    moveTo(pos) {

        if (this.disabled)
            return;

        let dir = this.getTargetDirection(pos.x);

        // TODO: Might be nice to have a walking anim too.
        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;

        this.scale.setTo(dir, 1);
        this.activeWeapon.scale.setTo(dir, 1);

    }

    stop() {

        this.body.velocity.x = 0;

    }

    getTargetDirection(tx) {

        return tx > this.x ? 1 : -1;

    }

    setTarget(t) {

        this.currentTarget = t;
        this.blackboard.set('currentTarget', this.currentTarget);

    }

    animateContinuous() {

        if (this.disabled)
            return;

        // Movement
        if (this.body.velocity.x != 0) {
            this.animations.play('run');
        } else {
            this.animations.play('idle');
        }

    }

    onAnimationStopped() {

        this.priorityAnimation = false;

    }

    takeDamage(n, origin) {

        if (this.disabled)
            return;

        console.log(this.name + " is taking damage: " + n);
        console.log(origin, "was origin of damage.");

        // Some cheeky knockback
        this.body.velocity.x = this.getTargetDirection(this.blackboard.get('currentTarget').x) * -300;
        this.body.velocity.y = -300;

        this.damageFlash();

    }

    damageFlash() {

        this.disabled = true;

        this.alpha = 0;
        this.tint = 0xffffff;

        this.flashTween = this.game.add.tween(this).to({
            tint: 0xffeeff,
            alpha: 1
        }, 10, "Linear", true, 0, -1);
        this.flashTween.yoyo(true, 10);

        this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function () {
            this.disabled = false;
            this.alpha = 1;
            this.tint = 0xffffff;
            this.flashTween.stop();
        }, this);

    }

}

export default Enemy;