import Phaser from 'phaser';

// objects
import Player from '../objects/player';
import World from '../objects/world';

interface KeyboardEvent {
  key: string;
}

class GameScene extends Phaser.Scene {
  private _player: Player | undefined;
  private _world: World | undefined;

  public constructor() {
    super({ key: 'GameScene' });
  }

  public preload(): void {
    const banner = document.getElementById('bannerText');
    if (banner) {
      banner.innerText = '';
    }
  }

  public create(): void {
    // world
    this._world = new World(this, 'e1m1');

    // player
    this._player = new Player({
      scene: this,
      x: 0,
      y: 0
    });
    if (this._world.collisionGroups) {
      this.physics.add.collider(this._player, this._world.collisionGroups);
    }

    // camera
    if (this._player && this._world.map) {
      this.cameras.main.startFollow(this._player);
      this.cameras.main.setBounds(
        0,
        0,
        this._world.map.widthInPixels,
        this._world.map.heightInPixels
      );
    }
  }

  public update(): void {
    if (this._player) {
      this._player.update();
    }
  }
}

export default GameScene;
