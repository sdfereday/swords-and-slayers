import SceneNode from '../nodes/SceneNode';

class Parallel extends SceneNode {

    constructor(data, wait) {

        super(wait);

        this.name = 'Parallel';
        this.children = data.children;
        this.len = this.children.length;
        this.isDone = false;

    }

    enter(params) {

        for (let i = 0; i < this.len; i++) {
            this.children[i].enter(params);
        }

    }

    update() {

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