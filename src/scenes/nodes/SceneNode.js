class SceneNode {

    constructor(wait, id) {

        this.id = id;
        this.name = 'Root';
        this.isDone = false;
        this.started = false;
        this.waitForInput = typeof wait === 'undefined' ? true : wait;

    }

    enter() {
        
        this.isDone = false;
        this.started = true;

    }

    update() {
        // ...
    }

    exit() {
        
        this.isDone = true;

    }

}

export default SceneNode;