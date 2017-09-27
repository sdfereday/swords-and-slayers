// https://github.com/renatopp/behavior3js/wiki/Core-04-Creating-Custom-Nodes
import 'b3';

let Idle = b3.Class(b3.Action);

Idle.prototype.name = 'Idle';

Idle.prototype.open = function (tick) {

    console.log("Idle...");
    console.log(tick);

};

Idle.prototype.tick = function (tick) {

    return b3.RUNNING;

};

export default Idle;