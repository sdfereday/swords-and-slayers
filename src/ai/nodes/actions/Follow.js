import 'b3';

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

export default Follow;