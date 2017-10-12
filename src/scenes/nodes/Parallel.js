import SceneNode from '../nodes/SceneNode';

class Parallel extends SceneNode {

    constructor(children, asynced, wait, id) {

        super(wait);

        this.name = 'Parallel';
        this.children = children;
        this.len = children.length;

        // Unique to this node (for now)
        this.started = false;
        this.asynced = asynced;

    }

    enter(params) {

        super.enter();

        for (let i = 0; i < this.len; i++) {
            this.children[i].enter(params);
        }

    }

    update() {

        for (let i = 0; i < this.len; i++) {
            this.children[i].update();
        }

        if (this.children.every(x => x.isDone))
            this.exit();

    }

    exit() {

        super.exit();

        for (let i = 0; i < this.len; i++) {
            this.children[i].exit();
        }

    }

}

export default Parallel;