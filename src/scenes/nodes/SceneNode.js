class SceneNode {

    constructor(wait) {

        this.name = 'Root';
        this.isDone = false;
        this.waitForInput = typeof wait === 'undefined' ? true : wait;

    }

    enter() {
        // ...
    }

    update() {
        // ...
    }

    exit() {
        // ...
    }

}

export default SceneNode;