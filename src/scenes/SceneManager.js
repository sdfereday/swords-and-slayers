// Data
import DSScenes from '../stubs/SceneData';
import SceneNodeFactory from '../factories/SceneNodeFactory';

class SceneManager {

    constructor(sceneId, game) {

        this.game = game;
        this.initialParams = {};
        this.currentSceneIndex = 0;
        this.started = false;
        this.ran = false;

        this.sceneRoot = DSScenes.find(x => x.id === sceneId);
        this.sceneData = SceneNodeFactory.mount(this.sceneRoot.sequence);

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

    next() {

        if (this.ran || this.current && !this.current.isDone && !this.current.asynced)
            return;

        if (!this.started)
            throw new Error("You must start the sequence before calling 'next'.");

        this.current = this.sceneData[this.currentSceneIndex];
        this.current.enter(this.initialParams);

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
            this.initialParams = params;
            this.next();
        } else {
            throw new Error("You cannot start a scene without scene data.");
        }

    }

    onFinished() {

        console.log("Sequence finished at", new Date().getTime());
        console.log("Transitiont to next scene:", this.sceneRoot.nextScene);

        // TODO: Check for garbage hanging around.
        this.game.state.start(this.sceneRoot.nextScene);

    }

}

export default SceneManager;