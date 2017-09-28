import 'b3';

let Attack = b3.Class(b3.Action);

Attack.prototype.name = 'Attack';

Attack.prototype.open = function (tick) {

    console.log("Attack...");
    console.log(tick);

    tick.target.attackTarget();

};

Attack.prototype.tick = function (tick) {

    return tick.target.attacking ? b3.RUNNING : b3.SUCCESS;

};

export default Attack;