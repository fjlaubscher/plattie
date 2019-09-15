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
  FALL: 4
};

class Player extends Phaser.GameObjects.Sprite {
  // variables
  private _scene: Phaser.Scene;
  private _jumping: boolean;

  public constructor({ scene, x, y }: PlayerOptions) {
    super(scene, x, y, 'player', FRAMES.IDLE);

    this._scene = scene;
    this._jumping = false;

    this.setupPhysics();
    this.setOrigin(0, 1);
    this._scene.add.existing(this);
  }

  private setupPhysics() {
    this._scene.physics.world.enable(this);

    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    physicsBody.maxVelocity.x = 200;
    physicsBody.maxVelocity.y = 200;
    physicsBody.setAccelerationX(0);
  }

  private animate(): void {
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;

    if (physicsBody.velocity.y > 0) {
      // FALL
      this.setFrame(FRAMES.FALL);
    } else if (physicsBody.velocity.y < 0) {
      // JUMP
      this.setFrame(FRAMES.JUMP);
    } else if (physicsBody.velocity.x !== 0) {
      // WALK
      this.anims.play('player-walk', true);
    } else {
      // IDLE
      this.anims.stop();
      this.setFrame(FRAMES.IDLE);
    }
  }

  public move(speed: number): void {
    if (!this._jumping) {
      const physicsBody = this.body as Phaser.Physics.Arcade.Body;
      physicsBody.setVelocityX(speed);
      this.setFlipX(speed < 0);
    }
  }

  public jump(): void {
    if (!this._jumping) {
      const physicsBody = this.body as Phaser.Physics.Arcade.Body;
      physicsBody.setVelocityY(-200);
      this._jumping = true;
    }
  }

  public update(): void {
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    if (
      physicsBody.onFloor() ||
      physicsBody.touching.down ||
      physicsBody.blocked.down
    ) {
      this._jumping = false;
    }

    this.animate();
  }
}

export default Player;
