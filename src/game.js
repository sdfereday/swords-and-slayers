import 'pixi';
import 'p2';
import Phaser from 'phaser';
import SceneState from './states/SceneState';
import GameState from './states/GameState';
// import UI from './ui/UI';

class Game extends Phaser.Game {

  constructor() {
    // https://pacoup.com/2011/06/12/list-of-true-169-resolutions/
    super(192, 108, Phaser.AUTO, 'game', null);
    this.state.add('SceneState', SceneState, false);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState', false, false, {
         useMapId: 'testlevel'
    });
    // this.state.start('SceneState', false, false, {
    //   useMapId: 'introduction',
    //   useSceneId: 'scene-2'
    // });
  }

}

new Game();