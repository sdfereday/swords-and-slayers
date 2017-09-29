class FirstFailure extends b3.Composite {

    constructor(children) {

        super(children);
        this.name = "FirstFailure";

    }

    tick(tick) {

        /*
        I believe a better approach might be to have a decorator that checks a boolean value.
        That'll keep things nice and simple.
        */

        for (let i = 0; i < this.children.length; i++) {

            let status = this.children[i]._execute(tick);

            if (status === b3.RUNNING)
                return br.RUNNING;

            if (status === b3.FAILURE)
                return b3.FAILURE;

        }

        return b3.SUCCESS;

    }

}

export default FirstFailure;