class SequenceSynced extends b3.Composite {

    constructor(children) {

        super(children);
        this.name = "SequenceSynced";
        this.i = 0;

    }

    tick(tick) {
        
        let status = this.children[this.i]._execute(tick);

        if(status === b3.SUCCESS) {

            if(this.i >= this.children.length - 1) {
                this.i = 0;
                return status;
            } else {
                this.i += 1;
            }

        }

        return b3.RUNNING;

    }

}

export default SequenceSynced;