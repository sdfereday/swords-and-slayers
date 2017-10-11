// Data
import DSScenes from '../stubs/SceneData';
import SceneNodeFactory from '../factories/SceneNodeFactory';

class SceneManager {

    constructor(sceneId) {

        this.currentSceneIndex = 0;
        this.currentAction = null;
        this.started = false;

        // Parse behaviour data in to useable tree
        this.sceneData = SceneNodeFactory.mount(DSScenes.find(x => x.id === sceneId).sequence);

    }

    update() {

        if (!this.current)
            return;

        this.current.update();

        if (this.current.isDone && !this.current.waitForInput) {
            this.current.exit();
            this.next();
        }

    }

    next(params) {

        if (!this.started)
            throw new Error("You must start the sequence before calling 'next'.");
        
        if (this.currentSceneIndex >= this.sceneData.length - 1) {
            this.started = false;
            this.onFinished();
        }

        if (this.current && !this.current.isDone)
            return;

        this.current = this.sceneData[this.currentSceneIndex];
        this.current.enter(params);

        this.currentSceneIndex += 1;

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

        console.log("Sequence is complete.");

    }

}

export default SceneManager;