import 'pixi';
import 'p2';
import Phaser from 'phaser';
import GameState from './states/GameState';

class Game extends Phaser.Game {

  constructor() {
    super(800, 600, Phaser.AUTO, 'phaser-example', null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
  }

}

new Game();