import SceneNode from '../nodes/SceneNode';

class Sequence extends SceneNode {

    constructor(children, data, wait, id) {

        super(wait);

        this.name = 'Sequence';
        this.children = children;
        this.len = children.length - 1;

        this.currentNodeIndex = 0;

    }

    enter(params) {

        super.enter();

        this.currentNodeIndex = 0;
        this.current = this.top();

    }

    update() {

        if (this.currentNodeIndex > this.len) {
            this.exit();
            return;
        }

        if (this.current && this.current.isDone)
            this.current = this.top();

    }

    top() {
        return this.children[this.currentNodeIndex];
    }

}

export default Sequence;