import Phaser from 'phaser';
import SceneNode from '../nodes/SceneNode';

class Fade extends SceneNode {

    constructor(data, wait) {

        super(wait);

        this.name = 'Fade';
        this.transition = data;

    }

    enter(params) {

        this.isDone = false;

        if (this.transition.dir > 0) {
            params.camera.fade(0x000000, 1);
            params.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                params.camera.flash('#000000', Phaser.Timer.SECOND * 1);
                // Not ideal, but there's no flash callback sadly.
                params.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                    this.isDone = true;
                    console.log("Fade In Done.");
                }, this);
            }, this);
        } else {
            params.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                params.camera.fade(0x000000, Phaser.Timer.SECOND * 1);
                params.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                    this.isDone = true;
                    console.log("Fade Out Done.");
                }, this);
            }, this);
        }

    }

    update() {

        console.log(this.isDone);

    }

    exit() {

        this.isDone = false;

    }

}

export default Fade;