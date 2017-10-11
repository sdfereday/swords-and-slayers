// Data
import DSScenes from '../stubs/SceneData';
import SceneNodeFactory from '../factories/SceneNodeFactory';

class SceneManager {

    constructor(sceneId) {

        this.currentSceneIndex = 0;
        this.currentAction = null;
        this.started = false;
        this.ran = false;

        this.sceneData = SceneNodeFactory.mount(DSScenes.find(x => x.id === sceneId).sequence);

    }

    update() {

        if (!this.current)
            return;

        this.current.update();

        // TODO: Put in standard loop, foreach is very slow...
        this.sceneData.forEach((x) => {
            
            // ...so is object comparison ---------------v
            if(!x.isDone && x.started && x.asynced && x !== this.current)
                x.update();

        }, this);

        if (this.current.isDone && !this.current.waitForInput) {
            this.current.exit();
            this.next();
        }

    }

    next(params) {

        if (this.ran || this.current && !this.current.isDone && !this.current.asynced)
            return;

        if (!this.started)
            throw new Error("You must start the sequence before calling 'next'.");

        this.current = this.sceneData[this.currentSceneIndex];
        this.current.enter(params);

        this.currentSceneIndex += 1;

        if (this.currentSceneIndex > this.sceneData.length - 1) {
            this.started = false;
            this.ran = true;
            this.onFinished();
        }

    }

    start(params) {

        if (this.sceneData.length > 0) {
            this.started = true;
            this.next(params);
        } else {
            throw new Error("You cannot start a scene without scene data.");
        }

    }

    onFinished() {

        console.log("Sequence finished at", new Date().getTime());

    }

}

export default SceneManager;