import SceneNode from '../nodes/SceneNode';

class Move extends SceneNode {

    constructor(data, wait, id) {

        super(wait);

        this.name = 'Move';

        this.targetId = data.targetId;
        this.currentTarget = null;

        this.config = {
            x: data.x,
            y: data.y,
            speed: data.speed,
            ignoreY: true
        };

    }

    enter(params) {

        super.enter();

        if (!params || !params.actors)
            return;

        this.currentTarget = params.actors.find(x => x.data.id === this.targetId).sprite;

    }

    update() {

        let complete = this.currentTarget.moveTo({
            x: this.config.x,
            y: this.config.ignoreY ? this.currentTarget.y : this.config.y,
            speed: this.config.speed
        });

        if(complete) {
            this.exit();
            this.currentTarget.stop();
        }

    }

}

export default Move;