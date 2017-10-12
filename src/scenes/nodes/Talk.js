import Phaser from 'phaser';
import SceneNode from '../nodes/SceneNode';
import EventManager from '../../events/EventManager';
import DSGameData from '../../stubs/GameData';

class Talk extends SceneNode {

    constructor(data, wait, id) {

        super(wait);

        this.name = 'Talk';
        this.exitAfterSeconds = data.exitAfterSeconds;
        this.initialNode = data.initialNode;
        this.targetId = data.targetId;

        this.actorName = DSGameData.actors.find(x => x.id === this.targetId).name;
        this.str = data.str;

        this.eventData = [this.actorName, this.str];

        this.closedByUser = data.closedByUser ? data.closedByUser : true;

        // I'd rather not have this, but so far I'm out of ideas.
        this.endNode = data.endNode;

    }

    enter(params) {

        super.enter();

        if (!params || !params.actors)
            return;

        let target = params.actors.find(x => x.data.id === this.targetId);

        if (this.initialNode) {
            EventManager.Trigger('onChatStart', this.eventData);
        } else {
            EventManager.Trigger('onChatUpdate', this.eventData);
        }

        if (this.exitAfterSeconds) {
            params.game.time.events.add(Phaser.Timer.SECOND * this.exitAfterSeconds, () => {
                super.exit();
                EventManager.Trigger('onChatExit');
            }, this);
        } else {
           // this.exit(); -> This being here seems to fix everything... why is this?
        }

    }

    exit() {

        if(this.exitAfterSeconds)
            return;

        super.exit();

        if(this.closedByUser && this.endNode)
            EventManager.Trigger('onChatExit');

    }

}

export default Talk;