import Phaser from 'phaser';

export interface PlayerOptions {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key?: string;
}

interface Keys {
  [key: string]: Phaser.Input.Keyboard.Key;
}

const FRAMES = {
  IDLE: 0,
  JUMP: 3,
  DUCK: 4
};

class Player extends Phaser.GameObjects.Sprite {
  // variables
  private _scene: Phaser.Scene;
  private _jumping: boolean;
  private _keys: Keys;

  public constructor({ scene, x, y }: PlayerOptions) {
    super(scene, x, y, 'player', FRAMES.IDLE);

    this._scene = scene;
    this._jumping = false;

    // setup keys
    this._keys = {
      LEFT: scene.input.keyboard.addKey('LEFT'),
      RIGHT: scene.input.keyboard.addKey('RIGHT'),
      UP: scene.input.keyboard.addKey('UP'),
      DOWN: scene.input.keyboard.addKey('DOWN')
    };

    this.setupPhysics();
    this.setOrigin(0, 1);
    this.setSize(64, 64);
    this.setDisplaySize(64, 64);
    this._scene.add.existing(this);
  }

  private setupPhysics() {
    this._scene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).maxVelocity.x = 200;
    (this.body as Phaser.Physics.Arcade.Body).maxVelocity.y = 200;
  }

  // movement
  private handleInput(): void {
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    if (
      physicsBody.onFloor() ||
      physicsBody.touching.down ||
      physicsBody.blocked.down
    ) {
      this._jumping = false;
    }

    if (this._keys['RIGHT'].isDown) {
      // move right
      physicsBody.setAccelerationX(200);
    } else if (this._keys['LEFT'].isDown) {
      // move left
      physicsBody.setAccelerationX(-200);
    } else {
      // idle
      physicsBody.setVelocityX(0);
      physicsBody.setAccelerationX(0);
    }

    if (this._keys['UP'].isDown && !this._jumping) {
      physicsBody.setVelocityY(-200);
      this._jumping = true;
    }
  }

  private animate(): void {
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;

    if (physicsBody.velocity.y !== 0) {
      // jumping / falling
      this.anims.stop();
      this.setFrame(FRAMES.JUMP);
    } else if (physicsBody.velocity.x !== 0) {
      // player is running
      this.anims.play('player-walk', true);
      this.setFlipX(physicsBody.velocity.x < 0);
    } else {
      // player is standing still
      this.anims.stop();
      this.setFrame(FRAMES.IDLE);
    }
  }

  public update(): void {
    this.handleInput();
    this.animate();
  }
}

export default Player;
