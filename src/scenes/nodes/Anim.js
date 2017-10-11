import SceneNode from '../nodes/SceneNode';

class Anim extends SceneNode {

    constructor(data, wait) {

        super(wait);
        
        this.name = 'Anim';
        this.animation = null; ///... look for with anim name

    }

    enter(params) {

        this.isDone = false;
        console.log("Play", this.animation);

        params.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
            this.isDone = true;
        }, this);

    }

}

export default Anim;