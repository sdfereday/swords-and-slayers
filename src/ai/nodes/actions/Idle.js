// https://github.com/renatopp/behavior3js/wiki/Core-04-Creating-Custom-Nodes
class Idle extends b3.Action {

    constructor() {

        super();
        this.name = 'Idle';

    }

    open(tick) {

        console.log("Idle...");
        console.log(tick);

    }

    tick(tick) {

        return b3.RUNNING;

    }

}

export default Idle;