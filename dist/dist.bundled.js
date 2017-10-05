webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helpers = function () {
    function Helpers() {
        _classCallCheck(this, Helpers);
    }

    _createClass(Helpers, null, [{
        key: "distance",
        value: function distance(object, target) {

            var a = object.x - target.x;
            var b = object.y - target.y;

            return Math.sqrt(a * a + b * b);
        }

        // -> http://davidarvelo.com/blog/array-number-range-sequences-in-javascript-es6/

    }, {
        key: "numberArray",
        value: function numberArray(begin, end) {
            var arr = [];
            for (var i = begin; i < end; i += 1) {
                arr.push(i);
            }
            return arr;
        }
    }, {
        key: "animDuration",
        value: function animDuration(fps, frameNum) {
            return fps * frameNum * 10;
        }
    }, {
        key: "getRandomInt",
        value: function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }
    }, {
        key: "getTargetDirection",
        value: function getTargetDirection(tx, ownerx) {

            return tx > ownerx ? 1 : -1;
        }
    }, {
        key: "targetWithinBounds",
        value: function targetWithinBounds(target, owner, range) {

            // Checks if the current target is within a good enough 'x' zone to prevent left-right shift (might need 'y' in future)
            return target && target.x > owner.x - range && target.x < owner.x + range;
        }
    }]);

    return Helpers;
}();

exports.default = Helpers;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Helpers = __webpack_require__(1);

var _Helpers2 = _interopRequireDefault(_Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Please make a 'const' or JSON in the future (when it's ready)
var gameData = {
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
        animations: [{
            name: 'idle',
            frames: _Helpers2.default.numberArray(3, 6),
            fps: 3,
            loops: true
        }, {
            name: 'run',
            frames: _Helpers2.default.numberArray(12, 18),
            fps: 12,
            loops: true
        }, {
            name: 'attack',
            frames: _Helpers2.default.numberArray(1, 3),
            fps: 10,
            loops: false
        }, {
            name: 'jump',
            frames: [7],
            fps: 8,
            loops: false
        }, {
            name: 'fall',
            frames: [18],
            fps: 8,
            loops: false
        }]
    },
    weapons: [{
        id: 'testWeapon',
        sprite: 'test-wep',
        weaponProperties: {
            value: {
                dmg: 1,
                animTime: 1000
            }
        },
        body: {
            x: 48,
            y: 64,
            w: 32,
            h: 32
        }
    }],
    creatures: [{
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
                behaviourId: 'testai',
                movementSpeed: 200,
                alertRange: 400,
                attackRange: 60
            }
        },
        animations: [{
            name: 'idle',
            frames: _Helpers2.default.numberArray(3, 6),
            fps: 3,
            loops: true
        }, {
            name: 'run',
            frames: _Helpers2.default.numberArray(12, 18),
            fps: 12,
            loops: true
        }, {
            name: 'attack',
            frames: _Helpers2.default.numberArray(1, 3),
            fps: 10,
            loops: false
        }]
    }]
}; // Technically you shouldn't need to change anything in here, but number arrays
// are so painful. Again though, this would all be in JSON and auto-generated to
// a point. Stubs are just what they are, stubs.
exports.default = gameData;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MixinBuilder = function () {
    function MixinBuilder(superclass) {
        _classCallCheck(this, MixinBuilder);

        this.superclass = superclass;
    }

    _createClass(MixinBuilder, [{
        key: "with",
        value: function _with() {
            for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
                mixins[_key] = arguments[_key];
            }

            return mixins.reduce(function (c, mixin) {
                return mixin(c);
            }, this.superclass);
        }
    }]);

    return MixinBuilder;
}();

exports.default = function (superclass) {
    return new MixinBuilder(superclass);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(1);

var _Helpers2 = _interopRequireDefault(_Helpers);

var _Animator = __webpack_require__(23);

var _Animator2 = _interopRequireDefault(_Animator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseEntity = function (_Phaser$Sprite) {
        _inherits(BaseEntity, _Phaser$Sprite);

        function BaseEntity(game, x, y, name, data) {
                _classCallCheck(this, BaseEntity);

                var _this = _possibleConstructorReturn(this, (BaseEntity.__proto__ || Object.getPrototypeOf(BaseEntity)).call(this, game, x, y, name));

                // Phaser requires all of these to happen


                game.add.existing(_this);
                game.physics.enable(_this, Phaser.Physics.ARCADE);

                // Custom data to expect for this entity
                _this.config = {};
                _this.stats = {};
                _this.equipment = {};
                _this.activeWeapon = null;

                // Define properties with supplied data (TODO: Revise method)
                if (data) {
                        Object.defineProperties(_this, data);
                }

                // Flags
                _this.busy = false;
                _this.disabled = false;

                // Set the anchor
                _this.anchor.x = 0.5;

                // Animations setup
                _this.animator = new _Animator2.default(_this.animations);

                return _this;
        }

        _createClass(BaseEntity, [{
                key: 'resetMovement',
                value: function resetMovement() {

                        this.body.velocity.x = 0;
                }
        }, {
                key: 'setBody',
                value: function setBody(bodyData) {

                        this.body.setSize(bodyData.x, bodyData.y, bodyData.w, bodyData.h);
                        return this;
                }
        }, {
                key: 'correctScale',
                value: function correctScale(dir) {

                        this.scale.setTo(dir, 1);

                        if (this.activeWeapon) this.activeWeapon.scale.setTo(dir, 1);
                }
        }, {
                key: 'faceTarget',
                value: function faceTarget(pos) {

                        this.correctScale(_Helpers2.default.getTargetDirection(pos.x, this.x));
                }
        }]);

        return BaseEntity;
}(Phaser.Sprite);

exports.default = BaseEntity;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TreeNodeTypes = __webpack_require__(10);

var _TreeNodeTypes2 = _interopRequireDefault(_TreeNodeTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// Consider adding a 'type' property to avoid confusion
// You can do this in JSON, but that's a future plan right now

/// Following is for reference (remove later):
// {
//     id: "testai",
//     root: new b3.Priority({
//         children: [
//             new BoolCheck('inRangeOfAttack', {
//                 child: new Attack()
//             }),
//             new BoolCheck('inRangeOfTarget', {
//                 child: new Follow()
//             }),
//             new SequenceSynced({
//                 children: [
//                     new Roam(true),
//                     new RandomWait()
//                 ]
//             })
//         ]
//     })
// },

var TreeData = [{
    id: "testai",
    root: {
        name: "Priority",
        type: _TreeNodeTypes2.default.COMPOSITE,
        children: [
        // {
        //     name: "BoolCheck",
        //     type: NodeTypes.DECORATOR,
        //     param: "inRangeOfAttack",
        //     child: {
        //         name: "Attack",
        //         type: NodeTypes.ACTION,
        //         param: null
        //     }
        // },
        // {
        //     name: "BoolCheck",
        //     type: NodeTypes.DECORATOR,
        //     param: "inRangeOfTarget",
        //     child: {
        //         name: "Follow",
        //         type: NodeTypes.ACTION,
        //         param: null
        //     }
        // },
        {
            name: "SequenceSynced",
            type: _TreeNodeTypes2.default.COMPOSITE,
            children: [{
                name: "Roam",
                type: _TreeNodeTypes2.default.ACTION,
                param: true
            }, {
                name: "RandomWait",
                type: _TreeNodeTypes2.default.ACTION,
                param: null
            }]
        }]
    }
}];

exports.default = TreeData;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var TreeNodeTypes = {
    "ACTION": 0,
    "DECORATOR": 1,
    "COMPOSITE": 2
};

exports.default = TreeNodeTypes;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Weapon = __webpack_require__(35);

var _Weapon2 = _interopRequireDefault(_Weapon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttachedWeapon = function AttachedWeapon(superclass) {
        return function (_superclass) {
                _inherits(_class, _superclass);

                function _class() {
                        _classCallCheck(this, _class);

                        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                }

                _createClass(_class, [{
                        key: 'attachWeapon',
                        value: function attachWeapon(weaponData, pos) {

                                this.activeWeapon = new _Weapon2.default(this.game, 0, 0, weaponData.sprite);
                                this.activeWeapon.y += this.activeWeapon.height;

                                if (pos) {
                                        this.activeWeapon.x = pos.x;
                                        this.activeWeapon.y = pos.y;
                                }

                                this.activeWeapon.setBody(weaponData.body);

                                return this;
                        }
                }]);

                return _class;
        }(superclass);
};

exports.default = AttachedWeapon;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HitEffects = function HitEffects(superclass) {
    return function (_superclass) {
        _inherits(_class, _superclass);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: "damageFlash",
            value: function damageFlash() {

                this.disabled = true;

                this.alpha = 0;
                this.tint = 0xffffff;

                this.flashTween = this.game.add.tween(this).to({
                    tint: 0xffeeff,
                    alpha: 1
                }, 10, "Linear", true, 0, -1);
                this.flashTween.yoyo(true, 10);

                this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function () {
                    this.disabled = false;
                    this.alpha = 1;
                    this.tint = 0xffffff;
                    this.flashTween.stop();
                }, this);
            }
        }]);

        return _class;
    }(superclass);
};

exports.default = HitEffects;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(4);

var _phaser = __webpack_require__(5);

var _phaser2 = _interopRequireDefault(_phaser);

var _GameState = __webpack_require__(18);

var _GameState2 = _interopRequireDefault(_GameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 800, 600, _phaser2.default.AUTO, 'phaser-example', null));

    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return Game;
}(_phaser2.default.Game);

new Game();

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

//// TODO: Fix the problem with the relative import urls


__webpack_require__(2);

__webpack_require__(4);

var _phaser = __webpack_require__(5);

var _phaser2 = _interopRequireDefault(_phaser);

var _MapData = __webpack_require__(19);

var _MapData2 = _interopRequireDefault(_MapData);

var _GameData = __webpack_require__(6);

var _GameData2 = _interopRequireDefault(_GameData);

var _WorldBuilder = __webpack_require__(20);

var _WorldBuilder2 = _interopRequireDefault(_WorldBuilder);

var _CreatureFactory = __webpack_require__(21);

var _CreatureFactory2 = _interopRequireDefault(_CreatureFactory);

var _Hero = __webpack_require__(36);

var _Hero2 = _interopRequireDefault(_Hero);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameState = function () {
        function GameState() {
                _classCallCheck(this, GameState);
        }

        _createClass(GameState, [{
                key: 'render',
                value: function render() {

                        //this.game.debug.bodyInfo(this.hero, 32, 32);
                        //this.game.debug.body(this.hero);

                        // this.game.debug.bodyInfo(this.hero.activeWeapon, 32, 32);
                        // this.game.debug.body(this.hero.activeWeapon);

                        // this.enemies.children.forEach((e) => {
                        //     this.game.debug.bodyInfo(e.activeWeapon, 32, 32);
                        //     this.game.debug.body(e.activeWeapon);
                        // });

                }
        }, {
                key: 'preload',
                value: function preload() {

                        this.game.load.spritesheet('player', 'resources/Game/player.png', 128, 128, 20);
                        this.game.load.spritesheet('enemy', 'resources/Game/enemy.png', 128, 128, 20);
                        this.game.load.image('ground', 'resources/Game/platform tile2.png', 32, 32);

                        // https://phaser.io/examples/v2/loader/load-tilemap-json
                        this.game.load.tilemap('level-tilemap', 'resources/Game/maps/world-sheet.json', null, _phaser2.default.Tilemap.TILED_JSON);
                        this.game.load.image('world-atlas', 'resources/Tiles/world-sheet.png');
                        this.game.load.image('col-atlas', 'resources/Tiles/col.png');

                        //...
                        this.game.load.image('slope-atlas', 'resources/Tiles/arcade-slopes-64.png');
                }
        }, {
                key: 'create',
                value: function create() {

                        // Load plugins
                        this.game.plugins.add(_phaser2.default.Plugin.ArcadeSlopes);

                        // Startup physics
                        this.game.physics.startSystem(_phaser2.default.Physics.ARCADE);
                        this.game.physics.arcade.gravity.y = 2500; // pixels/second/second
                        this.game.physics.arcade.TILE_BIAS = 40; // Prevents strange tile fall-through

                        this.game.stage.backgroundColor = '#2d2d2d';

                        // Create some ground for the player to walk on (this will be replaced by tilesets and proper parsing later)
                        var mapData = _MapData2.default.find(function (x) {
                                return x.id === 'testlevel';
                        });
                        var world = new _WorldBuilder2.default(this.game, {
                                tilemap: 'level-tilemap',
                                layers: [{
                                        name: 'world-sheet',
                                        cacheName: 'world-atlas',
                                        worldSizeLayer: true
                                }, {
                                        name: 'collidable',
                                        cacheName: 'col-atlas',
                                        collisionLayer: true
                                }]
                        });

                        // Should only be one needed per level so this is ok
                        this.collisionLayer = world.getCollisionLayer();

                        // Make entities
                        this.hero = new _Hero2.default(this.game, 250, 700, _GameData2.default.player.sprite, {
                                config: _GameData2.default.player.config,
                                stats: _GameData2.default.player.stats,
                                equipment: _GameData2.default.player.equipment
                        });

                        this.hero.attachWeapon(_GameData2.default.weapons.find(function (x) {
                                return x.id === _GameData2.default.player.equipment.value.primaryWeapon;
                        }));
                        this.hero.setBody(_GameData2.default.player.body);

                        if (_GameData2.default.player.animations && this.hero.animator) this.hero.animator.registerMany(_GameData2.default.player.animations);

                        // Make enemies and things
                        this.enemies = this.game.add.group();
                        this.enemyWeapons = this.game.add.group();

                        // TODO: Consider making the manifests available globally (no point making it complicated)
                        var enemies = mapData.enemies.map(function (d) {
                                //return CreatureFactory.make(d.id, d.pos, this.game);
                        }, this);

                        // enemies.forEach((creatureSprite) => {
                        //     creatureSprite.setTarget(this.hero);
                        //     this.enemies.add(creatureSprite);
                        //     if (creatureSprite.activeWeapon)
                        //         this.enemyWeapons.add(creatureSprite.activeWeapon);
                        // });

                        // Finally, enable camera
                        this.game.camera.follow(this.hero, _phaser2.default.Camera.FOLLOW_TOPDOWN);

                        /////
                        //https://github.com/hexus/phaser-arcade-slopes
                        // Experimental (slopes)
                        var map = world.gameTileMap;

                        map.addTilesetImage('arcade-slopes-64', 'slope-atlas');
                        this.game.slopes.convertTilemapLayer(this.collisionLayer, 'arcadeslopes', 14);
                        this.game.slopes.enable(this.hero);

                        this.collisionLayer.debug = true;
                }
        }, {
                key: 'update',
                value: function update() {

                        this.game.physics.arcade.collide(this.hero, this.collisionLayer);
                        this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

                        this.game.physics.arcade.overlap(this.hero.activeWeapon, this.enemies, function (weapon, npc) {
                                npc.takeDamage(weapon.damageOutput(), {
                                        x: weapon.x,
                                        y: weapon.y
                                });
                        }, null, this);

                        this.game.physics.arcade.overlap(this.hero, this.enemyWeapons, function (hero, weapon) {
                                hero.takeDamage(weapon.damageOutput(), {
                                        x: weapon.x,
                                        y: weapon.y
                                });
                        }, null, this);
                }
        }]);

        return GameState;
}();

exports.default = GameState;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var MapData = [{
    id: "testlevel",
    enemies: [{
        id: 'bug',
        pos: {
            x: 150,
            y: 100
        }
    }]
}];

exports.default = MapData;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorldBuilder = function () {
    function WorldBuilder(game, data) {
        _classCallCheck(this, WorldBuilder);

        this.game = game;
        this.layers = [];

        //  The 'name' key here is the Loader key given in game.load.tilemap
        this.gameTileMap = this.game.add.tilemap(data.tilemap);

        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'
        for (var i = 0; i < data.layers.length; i++) {

            var layer = data.layers[i];
            this.gameTileMap.addTilesetImage(layer.name, layer.cacheName);

            //  Creates a layer from the World1 layer in the map data.
            //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
            //  If naming from data, make sure it's the right name (see level json).
            this.layers.push({
                layerData: layer,
                phaserLayer: this.gameTileMap.createLayer(i)
            });
        }

        // Sanity checks
        if (this.layers.length === 0) throw new Error("You must have some layers defined.");

        // https://phaser.io/docs/2.4.4/Phaser.Tilemap.html#setCollision
        // Mapping the index would be just a matter of checking a property in 'tiled' for example (0 is floor tile in this instance)
        var collision = this.getCollisionLayer();
        if (collision) {
            this.gameTileMap.setCollisionByExclusion([0], true, collision);
        }

        //  This resizes the game world to match the layer dimensions
        var worldSizeLayer = this.getWorldSizeLayer();
        if (worldSizeLayer) {
            worldSizeLayer.resizeWorld();
        }
    }

    _createClass(WorldBuilder, [{
        key: "getCollisionLayer",
        value: function getCollisionLayer() {

            return this.layers.find(function (x) {
                return x.layerData.collisionLayer;
            }).phaserLayer;
        }
    }, {
        key: "getWorldSizeLayer",
        value: function getWorldSizeLayer() {

            return this.layers.find(function (x) {
                return x.layerData.worldSizeLayer;
            }).phaserLayer;
        }
    }]);

    return WorldBuilder;
}();

exports.default = WorldBuilder;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Enemy = __webpack_require__(22);

var _Enemy2 = _interopRequireDefault(_Enemy);

var _GameData = __webpack_require__(6);

var _GameData2 = _interopRequireDefault(_GameData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreatureFactory = function () {
    function CreatureFactory() {
        _classCallCheck(this, CreatureFactory);
    }

    _createClass(CreatureFactory, null, [{
        key: 'make',
        value: function make(id, pos, game) {

            var creatureData = _GameData2.default.creatures.find(function (x) {
                return x.id === id;
            }),
                creature = new _Enemy2.default(game, pos.x, pos.y, creatureData.sprite, {
                config: creatureData.config,
                stats: creatureData.stats,
                equipment: creatureData.equipment
            });

            creature.attachWeapon(_GameData2.default.weapons.find(function (x) {
                return x.id === creatureData.equipment.value.primaryWeapon;
            }));
            creature.setBody(creatureData.body);

            if (creatureData.animations && creature.animator) creature.animator.registerMany(creatureData.animations);

            return creature;
        }
    }]);

    return CreatureFactory;
}();

exports.default = CreatureFactory;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mix = __webpack_require__(7);

var _Mix2 = _interopRequireDefault(_Mix);

var _Helpers = __webpack_require__(1);

var _Helpers2 = _interopRequireDefault(_Helpers);

var _BaseEntity = __webpack_require__(8);

var _BaseEntity2 = _interopRequireDefault(_BaseEntity);

var _Behaviours = __webpack_require__(24);

var _Behaviours2 = _interopRequireDefault(_Behaviours);

var _AttachedWeapon = __webpack_require__(11);

var _AttachedWeapon2 = _interopRequireDefault(_AttachedWeapon);

var _HitEffects = __webpack_require__(12);

var _HitEffects2 = _interopRequireDefault(_HitEffects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = function (_mix$with) {
    _inherits(Enemy, _mix$with);

    function Enemy(game, x, y, name, data) {
        _classCallCheck(this, Enemy);

        var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, game, x, y, name, data));

        if (_this.config.behaviourId) _this.behaviours = new _Behaviours2.default(_this.config.behaviourId);

        return _this;
    }

    _createClass(Enemy, [{
        key: 'update',
        value: function update() {

            this.activeWeapon.anchorTo(this.x, this.y + this.activeWeapon.height);

            if (this.disabled && !this.body.onFloor()) return;

            if (this.disabled && this.body.onFloor()) {
                // Doesn't quite work
                // this.resetMovement();
                return;
            }

            this.resetMovement();

            if (!this.busy) this.behaviours.update(this);

            if (this.currentTarget) {
                var d = _Helpers2.default.distance(this, this.currentTarget);
                this.behaviours.setVariable('inRangeOfTarget', d < this.config.alertRange);
                this.behaviours.setVariable('inRangeOfAttack', d < this.config.attackRange);
            }

            this.animate();
        }

        /// AI Movement ///

    }, {
        key: 'move',
        value: function move(dir) {

            if (_Helpers2.default.distance(this, this.currentTarget) < this.width / 3 || this.disabled || _Helpers2.default.targetWithinBounds(this.currentTarget, this, this.width / 3)) return;

            this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;
            this.correctScale(dir);
        }
    }, {
        key: 'moveTo',
        value: function moveTo(pos) {

            if (this.disabled) return;

            var dir = _Helpers2.default.getTargetDirection(pos.x, this.x);

            // TODO: Might be nice to have a walking anim too.
            this.body.velocity.x += dir > 0 ? this.config.movementSpeed : -this.config.movementSpeed;
            this.correctScale(dir);
        }

        /// AI Actions ////

    }, {
        key: 'setTarget',
        value: function setTarget(t) {

            // Be careful with this and the GC. Multiple references can be damaging.
            this.currentTarget = t;
            this.behaviours.setVariable('currentTarget', t);
        }
    }, {
        key: 'chaseTarget',
        value: function chaseTarget() {

            this.move(_Helpers2.default.getTargetDirection(this.currentTarget.x, this.x));
        }
    }, {
        key: 'attackTarget',
        value: function attackTarget() {
            var _this2 = this;

            if (this.disabled || this.busy) return;

            this.faceTarget(this.currentTarget);

            this.busy = true;
            this.priorityAnimation = true;

            // TODO: Remove magic numbers
            var currentAnim = this.animator.getAnimation('attack'),
                attackStartDelay = _Helpers2.default.getRandomInt(200, 500),
                attackEndDelay = _Helpers2.default.getRandomInt(200, 500);

            this.game.time.events.add(attackStartDelay, function () {

                // We don't play the animation 'until' the attack starts :P
                _this2.animator.play('attack');

                _this2.activeWeapon.use(_Helpers2.default.animDuration(currentAnim.speed, currentAnim.frameTotal), function () {

                    _this2.game.time.events.add(attackEndDelay, function () {
                        _this2.busy = false;
                    }, _this2);
                });
            }, this);
        }

        /// Feedback ///

    }, {
        key: 'takeDamage',
        value: function takeDamage(n, origin) {

            if (this.disabled) return;

            console.log(this.name + " is taking damage: " + n);
            console.log(origin, "was origin of damage.");

            // Important otherwise you might run in to 'ghost' weapons
            this.activeWeapon.disable();

            // Some cheeky knockback
            this.body.velocity.x = _Helpers2.default.getTargetDirection(this.currentTarget.x, this.x) * -300;
            this.body.velocity.y = -300;

            this.damageFlash();
        }

        /// Animations ///

    }, {
        key: 'animate',
        value: function animate() {

            // Movement
            if (this.body.velocity.x != 0) {
                this.animator.play('run');
            } else {
                this.animator.play('idle');
            }
        }
    }]);

    return Enemy;
}((0, _Mix2.default)(_BaseEntity2.default).with(_HitEffects2.default, _AttachedWeapon2.default));

exports.default = Enemy;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animator = function () {
    function Animator(phaseranimator) {
        _classCallCheck(this, Animator);

        this.animator = phaseranimator;
        this.currentAnim = null;
        this.playWhenDone = '';
    }

    _createClass(Animator, [{
        key: 'registerMany',
        value: function registerMany(data) {

            for (var i = 0; i < data.length; i++) {
                this.register(data[i]);
            }
        }
    }, {
        key: 'register',
        value: function register(data) {

            if (this.getAnimation(data.name)) return;

            var anim = this.animator.add(data.name, data.frames, data.fps, data.loops);

            if (!data.loops) anim.onComplete.add(this.animDone, this);
        }
    }, {
        key: 'getAnimation',
        value: function getAnimation(str) {

            return this.animator.getAnimation(str);
        }
    }, {
        key: 'play',
        value: function play(str) {

            // Forces wait for none-looped animations (experimental)
            if (this.currentAnim && !this.currentAnim.loop) {
                this.playWhenDone = str;
                return;
            }

            var anim = this.animator.play(str);
            this.currentAnim = anim;

            return anim;
        }
    }, {
        key: 'animDone',
        value: function animDone() {

            if (this.playWhenDone.length > 0) this.currentAnim = this.animator.play(this.playWhenDone);
        }
    }]);

    return Animator;
}();

exports.default = Animator;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Data


var _TreeData = __webpack_require__(9);

var _TreeData2 = _interopRequireDefault(_TreeData);

var _BehaviourFactory = __webpack_require__(25);

var _BehaviourFactory2 = _interopRequireDefault(_BehaviourFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Behaviours = function () {
    function Behaviours(behaviourId) {
        _classCallCheck(this, Behaviours);

        // There should probably be only one tree instance, not one per entity
        this.blackboard = new b3.Blackboard();
        this.tree = new b3.BehaviorTree();

        // Parse behaviour data in to useable tree
        this.tree.root = _BehaviourFactory2.default.build(_TreeData2.default.find(function (x) {
            return x.id === behaviourId;
        }).root);

        return this;
    }

    _createClass(Behaviours, [{
        key: 'setVariable',
        value: function setVariable(str, data) {

            this.blackboard.set(str, data);
        }
    }, {
        key: 'update',
        value: function update(target) {

            this.tree.tick(target, this.blackboard);
        }
    }]);

    return Behaviours;
}();

exports.default = Behaviours;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Data


// Actions


// Composites


// Conditions


// Decorators


var _TreeNodeTypes = __webpack_require__(10);

var _TreeNodeTypes2 = _interopRequireDefault(_TreeNodeTypes);

var _TreeData = __webpack_require__(9);

var _TreeData2 = _interopRequireDefault(_TreeData);

var _Idle = __webpack_require__(26);

var _Idle2 = _interopRequireDefault(_Idle);

var _Follow = __webpack_require__(27);

var _Follow2 = _interopRequireDefault(_Follow);

var _Attack = __webpack_require__(28);

var _Attack2 = _interopRequireDefault(_Attack);

var _Roam = __webpack_require__(29);

var _Roam2 = _interopRequireDefault(_Roam);

var _RandomWait = __webpack_require__(30);

var _RandomWait2 = _interopRequireDefault(_RandomWait);

var _SequenceSynced = __webpack_require__(31);

var _SequenceSynced2 = _interopRequireDefault(_SequenceSynced);

var _InRange = __webpack_require__(32);

var _InRange2 = _interopRequireDefault(_InRange);

var _InAttackRange = __webpack_require__(33);

var _InAttackRange2 = _interopRequireDefault(_InAttackRange);

var _BoolCheck = __webpack_require__(34);

var _BoolCheck2 = _interopRequireDefault(_BoolCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Experimental
// https://k94n.com/es6-modules-single-instance-pattern
var nodeClasses = {
    'Priority': b3.Priority, // TODO: Fix b3 global in webpack, it's not quite right
    'Idle': _Idle2.default,
    'Follow': _Follow2.default,
    'Attack': _Attack2.default,
    'Roam': _Roam2.default,
    'RandomWait': _RandomWait2.default,
    'SequenceSynced': _SequenceSynced2.default,
    'InRange': _InRange2.default,
    'InAttackRange': _InAttackRange2.default,
    'BoolCheck': _BoolCheck2.default
};

var BehaviourFactory = function () {
    function BehaviourFactory() {
        _classCallCheck(this, BehaviourFactory);
    }

    _createClass(BehaviourFactory, null, [{
        key: 'build',
        value: function build(nd) {

            var CNS = nodeClasses[nd.name],
                children = [],
                child = {};

            if (!CNS) throw new Error("Constructor was undefined: " + nd.name);

            if (nd.children && nd.children.length > 0) {

                for (var i = 0; i < nd.children.length; i++) {
                    children.push(this.build(nd.children[i]));
                }
            }

            if (nd.child) child = this.build(nd.child);

            switch (nd.type) {
                case _TreeNodeTypes2.default.ACTION:
                    return new CNS(nd.param);
                case _TreeNodeTypes2.default.DECORATOR:
                    return new CNS(nd.param, { child: child });
                case _TreeNodeTypes2.default.COMPOSITE:
                    return new CNS({ children: children });
                default:
                    throw new Error("Unrecognized node type:" + nd.type);
            }
        }
    }]);

    return BehaviourFactory;
}();

exports.default = BehaviourFactory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// https://github.com/renatopp/behavior3js/wiki/Core-04-Creating-Custom-Nodes
var Idle = function (_b3$Action) {
    _inherits(Idle, _b3$Action);

    function Idle() {
        _classCallCheck(this, Idle);

        var _this = _possibleConstructorReturn(this, (Idle.__proto__ || Object.getPrototypeOf(Idle)).call(this));

        _this.name = 'Idle';

        return _this;
    }

    _createClass(Idle, [{
        key: 'open',
        value: function open(tick) {

            // console.log("Idle...");
            // console.log(tick);

        }
    }, {
        key: 'tick',
        value: function tick(_tick) {

            return b3.RUNNING;
        }
    }]);

    return Idle;
}(b3.Action);

exports.default = Idle;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Follow = function (_b3$Action) {
    _inherits(Follow, _b3$Action);

    function Follow() {
        _classCallCheck(this, Follow);

        var _this = _possibleConstructorReturn(this, (Follow.__proto__ || Object.getPrototypeOf(Follow)).call(this));

        _this.name = 'Follow';

        return _this;
    }

    _createClass(Follow, [{
        key: 'open',
        value: function open(tick) {

            // console.log("Follow...");
            // console.log(tick);

        }
    }, {
        key: 'tick',
        value: function tick(_tick) {

            _tick.target.chaseTarget();
            return b3.RUNNING;
        }
    }]);

    return Follow;
}(b3.Action);

exports.default = Follow;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Attack = function (_b3$Action) {
    _inherits(Attack, _b3$Action);

    function Attack() {
        _classCallCheck(this, Attack);

        var _this = _possibleConstructorReturn(this, (Attack.__proto__ || Object.getPrototypeOf(Attack)).call(this));

        _this.name = 'Attack';

        return _this;
    }

    _createClass(Attack, [{
        key: 'open',
        value: function open(tick) {

            tick.target.attackTarget();
        }
    }, {
        key: 'tick',
        value: function tick(_tick) {

            return _tick.target.busy ? b3.RUNNING : b3.SUCCESS;
        }
    }]);

    return Attack;
}(b3.Action);

exports.default = Attack;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(1);

var _Helpers2 = _interopRequireDefault(_Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Roam = function (_b3$Action) {
    _inherits(Roam, _b3$Action);

    function Roam(ignoreY) {
        _classCallCheck(this, Roam);

        var _this = _possibleConstructorReturn(this, (Roam.__proto__ || Object.getPrototypeOf(Roam)).call(this));

        _this.name = 'Roam';
        _this.currentLocation = {
            x: 0,
            y: 0
        };
        _this.destination = {
            x: 0,
            y: 0
        };

        _this.ignoreY = ignoreY;

        return _this;
    }

    _createClass(Roam, [{
        key: 'open',
        value: function open(tick) {

            this.currentLocation.x = tick.target.x;
            this.currentLocation.y = tick.target.y;

            this.destination.x = _Helpers2.default.getRandomInt(30, 770);
            this.destination.y = tick.target.y;

            console.log("Roam started...");
        }
    }, {
        key: 'tick',
        value: function tick(_tick) {

            if (this.ignoreY) this.destination.y = _tick.target.y;

            _tick.target.moveTo(this.destination);

            if (_Helpers2.default.distance({ x: _tick.target.x, y: _tick.target.y }, this.destination) < 30) {
                _tick.target.resetMovement();
                console.log("Destination reached.");
                return b3.SUCCESS;
            }

            return b3.RUNNING;
        }
    }]);

    return Roam;
}(b3.Action);

exports.default = Roam;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__(1);

var _Helpers2 = _interopRequireDefault(_Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RandomWait = function (_b3$Action) {
    _inherits(RandomWait, _b3$Action);

    function RandomWait() {
        _classCallCheck(this, RandomWait);

        var _this = _possibleConstructorReturn(this, (RandomWait.__proto__ || Object.getPrototypeOf(RandomWait)).call(this));

        _this.name = 'RandomWait';
        _this.startTime = 0;
        _this.endTime = 0;

        return _this;
    }

    _createClass(RandomWait, [{
        key: 'open',
        value: function open(tick) {

            this.startTime = new Date().getTime();
            this.endTime = _Helpers2.default.getRandomInt(1, 3) * 1000;

            console.log("Wait started.");
        }
    }, {
        key: 'tick',
        value: function tick(_tick) {

            var currTime = new Date().getTime();

            if (currTime - this.startTime > this.endTime) {
                console.log("Wait complete.");
                return b3.SUCCESS;
            }

            return b3.RUNNING;
        }
    }]);

    return RandomWait;
}(b3.Action);

exports.default = RandomWait;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SequenceSynced = function (_b3$Composite) {
    _inherits(SequenceSynced, _b3$Composite);

    function SequenceSynced(children) {
        _classCallCheck(this, SequenceSynced);

        var _this = _possibleConstructorReturn(this, (SequenceSynced.__proto__ || Object.getPrototypeOf(SequenceSynced)).call(this, children));

        _this.name = "SequenceSynced";
        _this.i = 0;

        return _this;
    }

    _createClass(SequenceSynced, [{
        key: "tick",
        value: function tick(_tick) {

            var status = this.children[this.i]._execute(_tick);

            if (status === b3.SUCCESS) {

                if (this.i >= this.children.length - 1) {
                    this.i = 0;
                    return status;
                } else {
                    this.i += 1;
                }
            }

            return b3.RUNNING;
        }
    }]);

    return SequenceSynced;
}(b3.Composite);

exports.default = SequenceSynced;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InRange = function (_b3$Condition) {
    _inherits(InRange, _b3$Condition);

    function InRange() {
        _classCallCheck(this, InRange);

        var _this = _possibleConstructorReturn(this, (InRange.__proto__ || Object.getPrototypeOf(InRange)).call(this));

        _this.name = 'InRange';

        return _this;
    }

    _createClass(InRange, [{
        key: 'tick',
        value: function tick(_tick) {

            if (_tick.blackboard.get('inRangeOfTarget')) return b3.SUCCESS;

            return b3.FAILURE;
        }
    }]);

    return InRange;
}(b3.Condition);

exports.default = InRange;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InAttackRange = function (_b3$Condition) {
    _inherits(InAttackRange, _b3$Condition);

    function InAttackRange() {
        _classCallCheck(this, InAttackRange);

        var _this = _possibleConstructorReturn(this, (InAttackRange.__proto__ || Object.getPrototypeOf(InAttackRange)).call(this));

        _this.name = 'InAttackRange';

        return _this;
    }

    _createClass(InAttackRange, [{
        key: 'tick',
        value: function tick(_tick) {

            if (_tick.blackboard.get('inRangeOfAttack')) return b3.SUCCESS;

            return b3.FAILURE;
        }
    }]);

    return InAttackRange;
}(b3.Condition);

exports.default = InAttackRange;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(b3) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoolCheck = function (_b3$Decorator) {
    _inherits(BoolCheck, _b3$Decorator);

    function BoolCheck(propertyName, child) {
        _classCallCheck(this, BoolCheck);

        var _this = _possibleConstructorReturn(this, (BoolCheck.__proto__ || Object.getPrototypeOf(BoolCheck)).call(this, child));

        _this.name = 'BoolCheck';
        _this.propertyName = propertyName;

        return _this;
    }

    _createClass(BoolCheck, [{
        key: 'tick',
        value: function tick(_tick) {

            if (!this.child) {
                return b3.ERROR;
            }

            if (_tick.blackboard.get(this.propertyName)) {
                this.child._execute(_tick);
                return b3.SUCCESS;
            }

            return b3.FAILURE;
        }
    }]);

    return BoolCheck;
}(b3.Decorator);

exports.default = BoolCheck;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Weapon = function (_Phaser$Sprite) {
    _inherits(Weapon, _Phaser$Sprite);

    function Weapon(game, x, y, name) {
        _classCallCheck(this, Weapon);

        var _this = _possibleConstructorReturn(this, (Weapon.__proto__ || Object.getPrototypeOf(Weapon)).call(this, game, x, y, name));

        game.add.existing(_this);
        game.physics.arcade.enable(_this);

        _this.name = name;
        _this.body.allowGravity = false;
        _this.body.enable = false;
        _this.alpha = 0.3;

        // You can override this
        _this.stats = {
            damageOutput: 1
        };

        // Set the anchor
        _this.anchor.x = 0.5;

        return _this;
    }

    _createClass(Weapon, [{
        key: 'use',
        value: function use(time, onComplete) {
            var _this2 = this;

            // TODO: To clean up properly. :P It'd be pretty useful to sniff the animation for it to get the timings.
            // Don't forget though, the weapon must sync with the thing that's using it (as if it's attached), can make
            // this more advanced but for now it matters not.
            if (this.body.enabled) return;

            this.body.enable = true;
            //this.alpha = 1;

            this.game.time.events.add(time, function () {
                _this2.body.enable = false;
                //this.alpha = 0;
                if (typeof onComplete === 'function') onComplete.call(_this2);
            }, this);
        }
    }, {
        key: 'disable',
        value: function disable() {

            this.body.enable = false;
        }
    }, {
        key: 'damageOutput',
        value: function damageOutput() {

            return this.stats.damageOutput;
        }
    }, {
        key: 'setBody',
        value: function setBody(d) {

            this.body.setSize(d.x, d.y, d.w, d.h);
        }
    }, {
        key: 'anchorTo',
        value: function anchorTo(x, y) {

            this.x = x;
            this.y = y;
        }
    }]);

    return Weapon;
}(Phaser.Sprite);

exports.default = Weapon;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mix = __webpack_require__(7);

var _Mix2 = _interopRequireDefault(_Mix);

var _Helpers = __webpack_require__(1);

var _Helpers2 = _interopRequireDefault(_Helpers);

var _BaseEntity = __webpack_require__(8);

var _BaseEntity2 = _interopRequireDefault(_BaseEntity);

var _InputManager = __webpack_require__(37);

var _InputManager2 = _interopRequireDefault(_InputManager);

var _AttachedWeapon = __webpack_require__(11);

var _AttachedWeapon2 = _interopRequireDefault(_AttachedWeapon);

var _HitEffects = __webpack_require__(12);

var _HitEffects2 = _interopRequireDefault(_HitEffects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_mix$with) {
    _inherits(Hero, _mix$with);

    function Hero(game, x, y, name, data) {
        _classCallCheck(this, Hero);

        var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, game, x, y, name, data));

        _this.body.collideWorldBounds = true;
        _this.itype = '';

        _this.jumps = 2;
        _this.jumping = false;
        _this.onFloor = false;

        _this.initManualInput();

        return _this;
    }

    _createClass(Hero, [{
        key: 'update',
        value: function update() {

            this.activeWeapon.anchorTo(this.x, this.y + this.activeWeapon.height);

            if (this.disabled && !this.body.onFloor()) return;

            if (this.disabled && this.body.onFloor()) {
                // Doesn't quite work
                // this.resetMovement();
                return;
            }

            this.inputUpdate();
            this.animate();
        }

        /// Manual Input ///

    }, {
        key: 'inputUpdate',
        value: function inputUpdate(inputType) {

            this.resetMovement();

            if (this.leftInputIsActive()) {
                this.body.velocity.x += -this.config.movementSpeed;
                this.correctScale(-1);
            } else if (this.rightInputIsActive()) {
                this.body.velocity.x += this.config.movementSpeed;
                this.correctScale(1);
            }

            if (this.body.onFloor()) {
                this.jumps = 2;
                this.jumping = false;
            }

            // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
            if (this.jumps > 0 && this.upInputIsActive(150)) {
                this.body.velocity.y = this.config.jumpSpeed;
                this.jumping = true;
            }

            // Reduce the number of available jumps if the jump input is released
            if (this.jumping && this.upInputReleased()) {
                this.jumps--;
                this.jumping = false;
            }
        }

        /// Actions ///

    }, {
        key: 'attack',
        value: function attack() {

            // Sometimes returns null, not sure why...
            var currentAnim = this.animator.play('attack');

            if (currentAnim) this.activeWeapon.use(_Helpers2.default.animDuration(currentAnim.speed, currentAnim.frameTotal));
        }

        /// Feedback ///

    }, {
        key: 'takeDamage',
        value: function takeDamage(n, origin) {

            if (this.disabled) return;

            console.log(this.name + " is taking damage: " + n);
            console.log(origin, "was origin of damage.");

            this.activeWeapon.disable();

            // Some cheeky knockback
            this.body.velocity.x = _Helpers2.default.getTargetDirection(origin.x, this.x) * -300;
            this.body.velocity.y = -300;

            this.damageFlash();
        }

        /// Animations ///

    }, {
        key: 'animate',
        value: function animate() {

            // Jumping
            if (this.body.velocity.y !== 0) {

                if (this.body.velocity.y < 0) {
                    this.animator.play('jump');
                } else {
                    this.animator.play('fall');
                }

                return;
            }

            // Movement
            if (this.body.velocity.x !== 0) {
                this.animator.play('run');
            } else {
                this.animator.play('idle');
            }
        }
    }]);

    return Hero;
}((0, _Mix2.default)(_BaseEntity2.default).with(_InputManager2.default, _HitEffects2.default, _AttachedWeapon2.default));

exports.default = Hero;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputManager = function InputManager(superclass) {
    return function (_superclass) {
        _inherits(_class, _superclass);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: "initManualInput",
            value: function initManualInput() {

                // Capture certain keys to prevent their default actions in the browser.
                // This is only necessary because this is an HTML5 game. Games on other
                // platforms may not need code like this.
                this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);

                this.attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

                // Based on an assumption (not great but I know it's there)
                this.attackKey.onDown.add(this.attack, this);
            }

            // This function should return true when the player activates the "go left" control
            // In this case, either holding the right arrow or tapping or clicking on the left
            // side of the screen.

        }, {
            key: "leftInputIsActive",
            value: function leftInputIsActive() {
                var isActive = false;

                isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
                isActive |= this.game.input.activePointer.isDown && this.game.input.activePointer.x < this.game.width / 4;

                return isActive;
            }

            // This function should return true when the player activates the "go right" control
            // In this case, either holding the right arrow or tapping or clicking on the right
            // side of the screen.

        }, {
            key: "rightInputIsActive",
            value: function rightInputIsActive() {
                var isActive = false;

                isActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
                isActive |= this.game.input.activePointer.isDown && this.game.input.activePointer.x > this.game.width / 2 + this.game.width / 4;

                return isActive;
            }

            // This function should return true when the player activates the "jump" control
            // In this case, either holding the up arrow or tapping or clicking on the center
            // part of the screen.

        }, {
            key: "upInputIsActive",
            value: function upInputIsActive(duration) {
                var isActive = false;

                isActive = this.game.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
                isActive |= this.game.input.activePointer.justPressed(duration + 1000 / 60) && this.game.input.activePointer.x > this.game.width / 4 && this.game.input.activePointer.x < this.game.width / 2 + this.game.width / 4;

                return isActive;
            }

            // This function returns true when the player releases the "jump" control

        }, {
            key: "upInputReleased",
            value: function upInputReleased() {
                var released = false;

                released = this.game.input.keyboard.upDuration(Phaser.Keyboard.UP);
                released |= this.game.input.activePointer.justReleased();

                return released;
            }
        }]);

        return _class;
    }(superclass);
};

exports.default = InputManager;

/***/ })
],[13]);
//# sourceMappingURL=dist.bundled.js.map