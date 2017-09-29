const gameData = {
    weapons: [
        {
            id: 'testWeapon',
            sprite: 'test-wep',
            weaponProperties: {
                value: {
                    dmg: 1,
                    animTime: 1000
                }
            }
        }
    ],
    creatures: [
        {
            id: 'bug',
            sprite: 'player',
            body: {
                x: 48,
                y: 48,
                w: 38,
                h: 80
            },
            stats: {
                value: {
                    hp: 4,
                    maxHP: 4
                }
            },
            equipment: {
                value: {
                    primaryWeapon: 'testWeapon'
                }
            },
            config: {
                value: {
                    movementSpeed: 200,
                    alertRange: 256,
                    attackRange: 80
                }
            }
        }
    ]
};

export default gameData;