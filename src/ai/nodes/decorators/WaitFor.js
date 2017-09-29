import 'b3';

class WaitFor extends b3.Decorator {

    constructor(child) {

        super(child);
        this.name = 'WaitFor';

    }

    tick(tick) {

        if (!this.child) {
            return b3.ERROR;
        }

        // Propagate the tick
        var status = this.child._execute(tick);

        return status;

    }

}

export default WaitFor;