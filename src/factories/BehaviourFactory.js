// Data
import NodeTypes from '../enums/TreeNodeTypes';
import DSBehaviours from '../stubs/TreeData';

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

// Experimental
// https://k94n.com/es6-modules-single-instance-pattern
const nodeClasses = {
    'Priority': b3.Priority, // TODO: Fix b3 global in webpack, it's not quite right
    'Idle': Idle,
    'Follow': Follow,
    'Attack': Attack,
    'Roam': Roam,
    'RandomWait': RandomWait,
    'SequenceSynced': SequenceSynced,
    'InRange': InRange,
    'InAttackRange': InAttackRange,
    'BoolCheck': BoolCheck
};

class BehaviourFactory {

    static build(nd) {

        let CNS = nodeClasses[nd.name],
            children = [],
            child = {};

        if (!CNS)
            throw new Error("Constructor was undefined: " + nd.name);

        if (nd.children && nd.children.length > 0) {

            for (let i = 0; i < nd.children.length; i++) {
                children.push(this.build(nd.children[i]));
            }

        }

        if (nd.child)
            child = this.build(nd.child);

        switch (nd.type) {
            case NodeTypes.ACTION:
                return new CNS(nd.param);
            case NodeTypes.DECORATOR:
                return new CNS(nd.param, { child });
            case NodeTypes.COMPOSITE:
                return new CNS({ children });
            default:
                throw new Error("Unrecognized node type:" + nd.type);
        }

    }

}

export default BehaviourFactory;