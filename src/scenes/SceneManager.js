// Data
import DSScenes from '../stubs/SceneData';
import SceneNodeFactory from '../factories/SceneNodeFactory';

class SceneManager {

    constructor(sceneId, game) {

        this.game = game;
        this.initialParams = {};
        this.currentSceneIndex = 0;
        this.sequenceFinished = false;
        this.stopped = false;

        this.sceneRoot = DSScenes.find(x => x.id === sceneId);
        this.sceneData = SceneNodeFactory.mount(this.sceneRoot.sequence);

    }

    update() {

        if (!this.current || this.stopped)
            return;

        if (this.sequenceFinished && this.allComplete()) {

            console.info("Waiting for remaining tasks to finish...");
            this.onFinished();

            return;

        }

        // TODO: Put in standard loop, foreach is very slow...
        this.sceneData.forEach((x) => {

            // Just update all of them if they're not done (including current)
            if (!x.isDone && x.started)
                x.update();

        }, this);
        
        if (this.current.isDone && !this.current.waitForInput && !this.sequenceFinished) {

            this.current.exit();
            this.next();

        }

    }

    next() {

        if (this.sequenceFinished || this.current && !this.current.isDone && !this.current.asynced)
            return;

        this.current = this.sceneData[this.currentSceneIndex];
        this.current.enter(this.initialParams);

        this.currentSceneIndex += 1;

        if (this.currentSceneIndex > this.sceneData.length - 1) {

            this.sequenceFinished = true;

            if (this.allComplete())
                this.onFinished();

        }

    }

    start(params) {

        if (this.sceneData.length > 0) {
            this.initialParams = params;
            this.next();
        } else {
            throw new Error("You cannot start a scene without scene data.");
        }

    }

    allComplete() {

        return this.sceneData.every(x => x.isDone);

    }

    onFinished() {

        this.stopped = true;
        this.current = null;

        console.log("Sequence finished at", new Date().getTime());
        console.log("Transitiont to next scene:", this.sceneRoot.nextScene);

        // Who's done?
        for (let i = 0; i < this.sceneData.length; i++) {
            console.log(this.sceneData[i].isDone);
        }

        console.log("... of:", this.sceneData.length);

        return;

        // TODO: Check for garbage hanging around.
        this.game.state.start(this.sceneRoot.nextScene);

    }

}

export default SceneManager;