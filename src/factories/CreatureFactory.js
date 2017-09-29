import Enemy from '../entities/Enemy';
import GameData from '../stubs/GameData';

class CreatureFactory {

    static make(id, pos, game) {

        let creatureData = GameData.creatures.find(x => x.id === id),
            creature = new Enemy(game, pos.x, pos.y, creatureData.sprite);

        if (!creatureData)
            throw new Error("There was no creature data.");

        creature.setData({
            config: creatureData.config,
            stats: creatureData.stats,
            equipment: creatureData.equipment
        })
            .setWeapon(GameData.weapons.find(x => x.id === creatureData.equipment.value.primaryWeapon))
            .setBody(creatureData.body)
            .initializeAI();

        return creature;

    }

}

export default CreatureFactory;