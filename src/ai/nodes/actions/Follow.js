import 'b3';

class Follow extends b3.Action {

    constructor() {

        super();
        this.name = 'Follow';

    }

    open(tick) {

        // console.log("Follow...");
        // console.log(tick);

    }

    tick(tick) {

        tick.target.chaseTarget();
        return b3.RUNNING;

    }

}
export default Follow;