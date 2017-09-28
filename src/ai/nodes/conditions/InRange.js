import 'b3';

class InRange extends b3.Condition {

    constructor() {

        super();
        this.name = 'InRange';

    }

    tick(tick) {

        if (tick.blackboard.get('inRangeOfTarget'))
            return b3.SUCCESS;

        return b3.FAILURE;

    }

}

export default InRange;