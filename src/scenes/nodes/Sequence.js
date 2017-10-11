import SceneNode from '../nodes/SceneNode';

class Sequence extends SceneNode {

    constructor(children, data, wait) {

        super(wait);

        this.name = 'Sequence';
        this.children = children;
        this.len = children.length - 1;
        this.isDone = false;

        this.currentNodeIndex = 0;

    }

    enter(params) {

        this.currentNodeIndex = 0;
        this.current = this.top();

    }

    update() {

        if (this.currentNodeIndex > this.len) {
            this.isDone = true;
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