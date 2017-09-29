import 'b3';

class NotBusy extends b3.Condition {

    constructor() {

        super();
        this.name = 'NotBusy';

    }

    tick(tick) {

        return tick.target.busy ? b3.FAILURE : b3.SUCCESS;

    }

}

export default NotBusy;