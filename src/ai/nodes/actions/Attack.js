import 'b3';

class Attack extends b3.Action {

    constructor() {
        
        super();
        this.name = 'Attack';

    }

    open(tick) {

        tick.target.attackTarget();

    }

    tick(tick) {
        
        return tick.target.busy ? b3.RUNNING : b3.SUCCESS;
        
    }

}

export default Attack;