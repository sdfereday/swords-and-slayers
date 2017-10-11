// Data
import NodeTypes from '../enums/SceneNodeTypes';
import Talk from '../scenes/nodes/Talk';
import Parallel from '../scenes/nodes/Parallel';
import Anim from '../scenes/nodes/Anim';
import Move from '../scenes/nodes/Move';

// Experimental
// https://k94n.com/es6-modules-single-instance-pattern
const nodeClasses = {
    'Talk': Talk,
    'Parallel': Parallel,
    'Anim': Anim,
    'Move': Move
};

class BehaviourFactory {

    static mount(arr) {

        return arr.map((a) => {

            return this.build(a);

        });

    }

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
            case NodeTypes.TALK:
                return new CNS(nd.data, nd.waitForInput);
            case NodeTypes.MOVE:
                return new CNS(nd.data, nd.waitForInput);
            case NodeTypes.ANIM:
                return new CNS(nd.data, nd.waitForInput);
            case NodeTypes.PARALLEL:
                return new CNS({
                    children
                }, nd.waitForInput);
            default:
                throw new Error("Unrecognized node type:" + nd.type);
        }

    }

}

export default BehaviourFactory;