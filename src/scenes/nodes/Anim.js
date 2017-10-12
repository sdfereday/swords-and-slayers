import SceneNode from '../nodes/SceneNode';

class Anim extends SceneNode {

    constructor(data, wait, id) {

        super(wait);
        
        this.name = 'Anim';
        this.animation = null; ///... look for with anim name

    }

    enter(params) {

        super.enter();

        console.log("Play", this.animation);

        params.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            this.exit();
        }, this);

    }

}

export default Anim;