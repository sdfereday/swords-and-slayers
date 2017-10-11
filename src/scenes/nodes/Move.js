import SceneNode from '../nodes/SceneNode';

class Move extends SceneNode {

    constructor(data, wait) {

        super(wait);

        this.name = 'Move';
        this.waitForInput = data.waitForInput;

        this.targetId = data.targetId;
        this.currentTarget = null;
        this.config = {
            x: data.x,
            y: data.y,
            speed: data.speed
        };

    }

    enter(params) {

        if (!params || !params.actors)
            return;

        this.currentTarget = params.actors.find(x => x.data.id === this.targetId).sprite;

    }

    update() {
        
        this.isDone = true;

        return;

        this.isDone = this.currentTarget.moveTo({
            x: this.config.x,
            y: this.config.y,
            speed: this.config.speed
        });

    }

}

export default Move;