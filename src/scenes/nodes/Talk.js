import SceneNode from '../nodes/SceneNode';
import EventManager from '../../events/EventManager';

class Talk extends SceneNode {

    constructor(data, wait) {

        super(wait);
        
        this.name = 'Talk';
        this.str = data.str;
        this.targetId = data.targetId;

    }

    enter(params) {
    
        console.log(this.name);
        console.log(this.str);

        if(!params || !params.actors)
            return;

        let target = params.actors.find(x => x.data.id === this.targetId);

        this.isDone = true;

        EventManager.Trigger('onChat', this.str);

    }

    exit(cb) {

        if(typeof cb === 'function')
            cb.call(this);

    }

}

export default Talk;