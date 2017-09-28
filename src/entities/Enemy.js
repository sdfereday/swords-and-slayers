// Helpers
import Helpers from '../helpers/Helpers';

// Actions
import Idle from '../ai/nodes/actions/Idle';
import Follow from '../ai/nodes/actions/Follow';
import Attack from '../ai/nodes/actions/Attack';

// Conditions
import InRange from '../ai/nodes/conditions/InRange';
import InAttackRange from '../ai/nodes/conditions/InAttackRange';

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
            alertRange: 300,
            attackRange: 100
        };

        // Current weapon is changeable per enemy (like the rest)
        this.currentWeapon = {
            animTime: 1000
        };

        this.currentTarget = null;
        this.attacking = false;
        this.disabled = false;
        
        // Set the anchor
        this.anchor.x = 0.5;

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
                new b3.Sequence({
                    children: [
                        new InAttackRange(),
                        new Attack(),

                    ]
                }),
                new b3.Sequence({
                    children: [
                        new InRange(),
                        new Follow()
                    ]
                }),
                new b3.Sequence({
                    children: [
                        new Idle()
                    ]
                })
            ]
        });

        // And again like player, some classy animations
        let idleAnim = this.animations.add('idle', Helpers.numberArray(3, 6), 3, true);
        let runAnim = this.animations.add('run', Helpers.numberArray(12, 18), 12, true);

    }

    update() {

        if(!this.disabled || this.disabled && this.body.velocity.y === 0)
            this.body.velocity.x = 0;

        this.tree.tick(this, this.blackboard);

        if (this.currentTarget) {
            let d = Helpers.distance(this, this.currentTarget);
            this.blackboard.set('inRangeOfTarget', d < this.config.alertRange);
            this.blackboard.set('inRangeOfAttack', d < this.config.attackRange);
        }

        // Play looped anims
        if(!this.priorityAnimation)
            this.animateContinuous();

    }

    chaseTarget() {

        let dirToTarget = this.getTargetDirection(this.blackboard.get('currentTarget').x);
        this.move(dirToTarget);

    }

    attackTarget() {

        if(this.disabled)
            return;

        // You don't need promises here since attacks are precise times that don't rely on network latency
        console.log("Attack target start.");
        this.attacking = true;

        // TODO: Convert all set timeouts to something more efficient
        setTimeout(this.onAttackComplete.bind(this), this.currentWeapon.animTime);

    }

    move(dir) {

        if (Helpers.distance(this, this.currentTarget) < 5 || this.disabled)
            return;

        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;

        this.scale.setTo(dir, 1);

    }

    getTargetDirection(tx) {
        
        return tx > this.x ? 1 : -1;

    }

    setTarget(t) {

        this.currentTarget = t;
        this.blackboard.set('currentTarget', this.currentTarget);

    }

    animateContinuous() {

        if(this.disabled)
            return;

        // Movement
        if(this.body.velocity.x != 0) {
            this.animations.play('run');
        } else {
            this.animations.play('idle');
        }
        
    }

    onAttackComplete() {
        
        console.log("Attack target finish.");
        this.attacking = false;

    }

    takeDamage(n, origin) {

        if(this.disabled)
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

        this.flashTween = this.game.add.tween(this).to( {
            tint: 0xffeeff,
            alpha: 1
        }, 10, "Linear", true, 0, -1);
        this.flashTween.yoyo(true, 10);

        this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function(){
            this.disabled = false;
            this.alpha = 1;
            this.tint = 0xffffff;
            this.flashTween.stop();
        }, this);

    }

}

export default Enemy;