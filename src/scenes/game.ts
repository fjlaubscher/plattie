import Phaser from 'phaser';

// objects
import Player from '../objects/player';
import World from '../objects/world';

// helpers
import { bindButtonEvents } from '../helpers/button';

interface Keys {
  [key: string]: Phaser.Input.Keyboard.Key;
}

const PLAYER_SPEED = 200;

class GameScene extends Phaser.Scene {
  private _player: Player | undefined;
  private _world: World | undefined;
  private _keys: Keys | undefined;

  public constructor() {
    super({ key: 'GameScene' });
  }

  public preload(): void {
    const banner = document.getElementById('bannerText');
    if (banner) {
      banner.innerText = '';
    }

    // buttons
    bindButtonEvents(
      'btnLeft',
      () => this._player && this._player.move(-PLAYER_SPEED),
      () => this._player && this._player.move(0)
    );
    bindButtonEvents(
      'btnRight',
      () => this._player && this._player.move(PLAYER_SPEED),
      () => this._player && this._player.move(0)
    );
    bindButtonEvents('btnA', () => this._player && this._player.jump());

    // setup keys
    this._keys = {
      LEFT: this.input.keyboard.addKey('LEFT'),
      RIGHT: this.input.keyboard.addKey('RIGHT'),
      UP: this.input.keyboard.addKey('UP')
    };
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
      // check keyboard events
      if (this._keys) {
        if (this._keys['LEFT'].isDown) {
          this._player.move(-PLAYER_SPEED);
        } else if (this._keys['RIGHT'].isDown) {
          this._player.move(PLAYER_SPEED);
        } else {
          this._player.move(0);
        }

        if (this._keys['UP'].isDown) {
          this._player.jump();
        }
      }

      this._player.update();
    }
  }
}

export default GameScene;
