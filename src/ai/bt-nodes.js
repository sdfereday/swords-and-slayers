// https://github.com/renatopp/behavior3js/wiki/Core-04-Creating-Custom-Nodes
// Actions
let Idle = b3.Class(b3.Action);

Idle.prototype.name = 'Idle';

Idle.prototype.open = function (tick) {

    console.log("Idle...");
    console.log(tick);

};

Idle.prototype.tick = function (tick) {

    return b3.RUNNING;

};

let Follow = b3.Class(b3.Action);

Follow.prototype.name = 'Follow';

Follow.prototype.open = function (tick) {

    console.log("Follow...");
    console.log(tick);

};

Follow.prototype.tick = function (tick) {

    tick.target.chaseTarget();
    return b3.RUNNING;

};

// Conditions
let InRange = b3.Class(b3.Condition);

InRange.prototype.name = 'InRange';

InRange.prototype.tick = function (tick) {

    if (tick.blackboard.get('inRangeOfTarget'))
        return b3.SUCCESS;

    return b3.FAILURE;

};

let OutOfRange = b3.Class(b3.Condition);

OutOfRange.prototype.name = 'OutOfRange';

OutOfRange.prototype.tick = function (tick) {

    if (!tick.blackboard.get('inRangeOfTarget'))
        return b3.SUCCESS;

    return b3.FAILURE;

};