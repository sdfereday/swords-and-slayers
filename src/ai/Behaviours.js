// Data
import DSBehaviours from '../stubs/TreeData';
import BehaviourFactory from '../factories/BehaviourFactory';

class Behaviours {

    constructor(behaviourId) {

        // There should probably be only one tree instance, not one per entity
        this.blackboard = new b3.Blackboard();
        this.tree = new b3.BehaviorTree();

        // Parse behaviour data in to useable tree
        this.tree.root = BehaviourFactory.build(DSBehaviours.find(x => x.id === behaviourId).root);

        return this;

    }

    setVariable(str, data) {

        this.blackboard.set(str, data);

    }

    update(target) {

        this.tree.tick(target, this.blackboard);

    }

}

export default Behaviours;