import SceneNode from '../nodes/SceneNode';

class Parallel extends SceneNode {

    constructor(children, asynced, wait) {

        super(wait);

        this.name = 'Parallel';
        this.children = children;
        this.len = children.length;
        this.isDone = false;

        // Unique to this node (for now)
        this.started = false;
        this.asynced = asynced;

    }

    enter(params) {

        this.started = true;

        for (let i = 0; i < this.len; i++) {
            this.children[i].enter(params);
        }

    }

    update() {

        if(this.isDone) {
            this.exit();
            this.started = false;
            return;
        }

        this.isDone = this.children.every((x) => {
            x.update();
            return x.isDone;
        });

    }

    exit() {

        for (let i = 0; i < this.len; i++) {
            this.children[i].exit();
        }

    }

}

export default Parallel;