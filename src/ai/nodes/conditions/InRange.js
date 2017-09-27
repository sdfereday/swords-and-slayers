import 'b3';

let InRange = b3.Class(b3.Condition);

InRange.prototype.name = 'InRange';

InRange.prototype.tick = function (tick) {

    if (tick.blackboard.get('inRangeOfTarget'))
        return b3.SUCCESS;

    return b3.FAILURE;

};

export default InRange;