import Phaser from 'phaser';
import Colors from './colors';

// scenes
import BootScene from './scenes/boot';
import GameScene from './scenes/game';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: Colors.primaryLight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 }
    }
  },
  render: { pixelArt: true, antialias: false },
  scene: [BootScene, GameScene]
};

class Game extends Phaser.Game {
  public constructor() {
    super(config);
  }
}

export default Game;
