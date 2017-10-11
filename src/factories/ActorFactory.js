import Actor from '../entities/Actor';
import GameData from '../stubs/GameData';

class ActorFactory {

    static make(id, pos, game) {

        let actorData = GameData.actors.find(x => x.id === id);

        if (!actorData)
            throw new Error("Cannot find an actor with the id '" + id + "'.");

        let actor = new Actor(game, pos.x, pos.y, actorData.sprite, {
            config: actorData.config,
            stats: actorData.stats
        });

        if (actorData.animations && actor.animator)
            actor.animator.registerMany(actorData.animations);

        return actor;

    }

}

export default ActorFactory;