// Data
import Helpers from '../helpers/Helpers';
import NodeTypes from '../enums/SceneNodeTypes';
import Talk from '../scenes/nodes/Talk';
import Parallel from '../scenes/nodes/Parallel';
import Sequence from '../scenes/nodes/Sequence';
import Anim from '../scenes/nodes/Anim';
import Move from '../scenes/nodes/Move';
import Fade from '../scenes/nodes/Fade';

// Experimental
// https://k94n.com/es6-modules-single-instance-pattern
const nodeClasses = {
    Talk,
    Parallel,
    Sequence,
    Anim,
    Move,
    Fade
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
                return new CNS(nd.data, nd.waitForInput, Helpers.guid());
            case NodeTypes.MOVE:
                return new CNS(nd.data, nd.waitForInput, Helpers.guid());
            case NodeTypes.ANIM:
                return new CNS(nd.data, nd.waitForInput, Helpers.guid());
            case NodeTypes.FADE:
                return new CNS(nd.data, nd.waitForInput, Helpers.guid());
            case NodeTypes.SEQUENCE:
                return new CNS(children, nd.waitForInput, Helpers.guid());
            case NodeTypes.PARALLEL:
                return new CNS(children, nd.asynced, nd.waitForInput, Helpers.guid());
            default:
                throw new Error("Unrecognized node type:" + nd.type);
        }

    }

}

export default BehaviourFactory;