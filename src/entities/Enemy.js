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

    }

    update() {

        this.body.velocity.x = 0;

        this.tree.tick(this, this.blackboard);

        if (this.currentTarget) {
            let d = Helpers.distance(this, this.currentTarget);
            this.blackboard.set('inRangeOfTarget', d < this.config.alertRange);
            this.blackboard.set('inRangeOfAttack', d < this.config.attackRange);
        }

    }

    chaseTarget() {

        let dirToTarget = this.getTargetDirection(this.blackboard.get('currentTarget').x);
        this.move(dirToTarget);

    }

    attackTarget() {

        // You don't need promises here since attacks are precise times that don't rely on network latency
        console.log("Attack target start.");
        this.attacking = true;

        // TODO: Convert all set timeouts to something more efficient
        setTimeout(this.onAttackComplete.bind(this), this.currentWeapon.animTime);

    }

    onAttackComplete() {
        
        console.log("Attack target finish.");
        this.attacking = false;

    }

    move(dir) {

        if (Helpers.distance(this, this.currentTarget) < 5)
            return;

        this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;

    }

    getTargetDirection(tx) {
        
        return tx > this.x ? 1 : -1;

    }

    setTarget(t) {

        this.currentTarget = t;
        this.blackboard.set('currentTarget', this.currentTarget);

    }

    takeDamage(n, origin) {

        console.log(this.name + " is taking damage: " + n);
        console.log(origin, "was origin of damage.");

    }

}

export default Enemy;