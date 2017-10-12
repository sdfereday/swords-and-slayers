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
        this.endNode = data.endNode;
        this.targetId = data.targetId;

        this.actorName = DSGameData.actors.find(x => x.id === this.targetId).name;
        this.str = data.str;

        this.eventData = [this.actorName, this.str];

    }

    enter(params) {

        super.enter();

        if (!params || !params.actors)
            return;

        let target = params.actors.find(x => x.data.id === this.targetId);

        if (this.exitAfterSeconds) {
            params.game.time.events.add(Phaser.Timer.SECOND * this.exitAfterSeconds, () => {
                this.closeSelf();
            }, this);
        } else {
            this.closeSelf();
        }

        if (this.initialNode) {
            EventManager.Trigger('onChatStart', this.eventData);
        } else {
            EventManager.Trigger('onChatUpdate', this.eventData);
        }

    }

    closeSelf() {
        this.exit();
        if (this.endNode)
            EventManager.Trigger('onChatExit');
    }

    exit(cb) {

        super.exit();

        if (typeof cb === 'function')
            cb.call(this);

    }

}

export default Talk;