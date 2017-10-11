import Enemy from '../entities/Enemy';
import GameData from '../stubs/GameData';

class CreatureFactory {

    static make(id, pos, game) {

        let creatureData = GameData.creatures.find(x => x.id === id);

        if(!creatureData)
            throw new Error("Cannot find a creature with the id '" + id + "'.");

        let creature = new Enemy(game, pos.x, pos.y, creatureData.sprite, {
                config: creatureData.config,
                stats: creatureData.stats,
                equipment: creatureData.equipment
            });

        creature.attachWeapon(GameData.weapons.find(x => x.id === creatureData.equipment.value.primaryWeapon));

        if (creatureData.animations && creature.animator)
            creature.animator.registerMany(creatureData.animations)

        return creature;

    }

}

export default CreatureFactory;