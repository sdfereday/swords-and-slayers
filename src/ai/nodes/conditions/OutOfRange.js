import 'b3';

let OutOfRange = b3.Class(b3.Condition);

OutOfRange.prototype.name = 'OutOfRange';

OutOfRange.prototype.tick = function (tick) {

    if (!tick.blackboard.get('inRangeOfTarget'))
        return b3.SUCCESS;

    return b3.FAILURE;

};

export default OutOfRange;