import Enemy from '../entities/Enemy';
import GameData from '../stubs/GameData';

class CreatureFactory {

    static make(id, pos, game) {

        let creatureData = GameData.creatures.find(x => x.id === id),
            creature = new Enemy(game, pos.x, pos.y, creatureData.sprite, {
                config: creatureData.config,
                stats: creatureData.stats,
                equipment: creatureData.equipment
            });

        creature.registerAnimations(creatureData.animations)
            .setWeapon(GameData.weapons.find(x => x.id === creatureData.equipment.value.primaryWeapon))
            .setBody(creatureData.body)
            .initializeAI();

        return creature;

    }

}

export default CreatureFactory;