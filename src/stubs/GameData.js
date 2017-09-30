// Technically you shouldn't need to change anything in here, but number arrays
// are so painful. Again though, this would all be in JSON and auto-generated to
// a point. Stubs are just what they are, stubs.
import Helpers from '../helpers/Helpers';

// Please make a 'const' or JSON in the future (when it's ready)
let gameData = {
    player: {
        id: 'player',
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
                movementSpeed: 400, // pixels/second/second
                jumpSpeed: -700 // pixels/second (negative y is up)
            }
        },
        animations: [
            {
                name: 'idle',
                frames: Helpers.numberArray(3, 6),
                fps: 3,
                loops: true
            },
            {
                name: 'run',
                frames: Helpers.numberArray(12, 18),
                fps: 12,
                loops: true
            },
            {
                name: 'attack',
                frames: Helpers.numberArray(1, 3),
                fps: 10,
                loops: false
            },
            {
                name: 'jump',
                frames: [7],
                fps: 8,
                loops: false
            },
            {
                name: 'fall',
                frames: [18],
                fps: 8,
                loops: false
            }
        ]
    },
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
            sprite: 'enemy',
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
                    alertRange: 400,
                    attackRange: 60
                }
            },
            animations: [
                {
                    name: 'idle',
                    frames: Helpers.numberArray(3, 6),
                    fps: 3,
                    loops: true
                },
                {
                    name: 'run',
                    frames: Helpers.numberArray(12, 18),
                    fps: 12,
                    loops: true
                },
                {
                    name: 'attack',
                    frames: Helpers.numberArray(1, 3),
                    fps: 10,
                    loops: false
                }
            ]
        }
    ]
};

export default gameData;