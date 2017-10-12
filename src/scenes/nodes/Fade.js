import Phaser from 'phaser';
import SceneNode from '../nodes/SceneNode';
import EventManager from '../../events/EventManager';

class Fade extends SceneNode {

    constructor(data, wait, id) {

        super(wait);

        this.name = 'Fade';
        this.transition = data;

    }

    enter(params) {

        super.enter();

        if (this.transition.dir > 0) {
            
            params.camera.fade(0x000000, 1);
            params.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
            
                params.camera.flash('#000000', Phaser.Timer.SECOND * 1);
                // Not ideal, but there's no flash callback sadly.
                params.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                    this.exit();
                }, this);
            
            }, this);

        } else {
            
            console.log("Fade out begin...");
            
            params.game.time.events.add(Phaser.Timer.SECOND * 1, () => {
                params.camera.fade(0x000000, Phaser.Timer.SECOND * 1);
                params.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                    this.exit();
                }, this);
            }, this);

        }

    }

}

export default Fade;