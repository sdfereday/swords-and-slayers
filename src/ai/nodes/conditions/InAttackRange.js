import 'b3';

let InAttackRange = b3.Class(b3.Condition);

InAttackRange.prototype.name = 'InAttackRange';

InAttackRange.prototype.tick = function (tick) {

    if (tick.blackboard.get('inRangeOfAttack'))
        return b3.SUCCESS;

    return b3.FAILURE;

};

export default InAttackRange;