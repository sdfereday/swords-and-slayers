import 'b3';

class BoolCheck extends b3.Decorator {

    constructor(propertyName, child) {

        super(child);
        this.name = 'BoolCheck';
        this.propertyName = propertyName;

    }

    tick(tick) {

        if (!this.child) {
            return b3.ERROR;
        }

        if(tick.blackboard.get(this.propertyName)) {
            this.child._execute(tick);
            return b3.SUCCESS;
        }

        return b3.FAILURE;

    }

}

export default BoolCheck;