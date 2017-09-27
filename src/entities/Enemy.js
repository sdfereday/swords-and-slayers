// Helpers
import Helpers from '../helpers/Helpers';

// Actions
import Idle from '../ai/nodes/actions/Idle';
import Follow from '../ai/nodes/actions/Follow';

// Conditions
import InRange from '../ai/nodes/conditions/InRange';
import OutOfRange from '../ai/nodes/conditions/OutOfRange';

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
        console.log(origin, "was origin of damage.");

    }

}

export default Enemy;