import 'b3';

class Attack extends b3.Action {

    constructor() {
        
        super();
        this.name = 'Attack';

    }

    open(tick) {

        console.log("Attack...");
        console.log(tick);

        tick.target.attackTarget();

    }

    tick(tick) {

        return tick.target.attacking ? b3.RUNNING : b3.SUCCESS;
        
    }

}

export default Attack;