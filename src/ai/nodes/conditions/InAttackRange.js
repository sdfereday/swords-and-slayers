import 'b3';

class InAttackRange extends b3.Condition {

    constructor() {

        super();
        this.name = 'InAttackRange';

    }

    tick(tick) {

        if (tick.blackboard.get('inRangeOfAttack'))
            return b3.SUCCESS;

        return b3.FAILURE;

    }

}

export default InAttackRange;