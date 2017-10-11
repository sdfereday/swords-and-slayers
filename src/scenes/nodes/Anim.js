import SceneNode from '../nodes/SceneNode';

class Anim extends SceneNode {

    constructor(data, wait) {

        super(wait);
        
        this.name = 'Anim';
        this.animation = null; ///... look for with anim name

    }

    enter() {

        this.isDone = true;
        console.log("Play", this.animation);

    }

}

export default Anim;