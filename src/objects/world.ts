import Phaser from 'phaser';

class World {
  public map: Phaser.Tilemaps.Tilemap | undefined;
  public collisionGroups: Phaser.GameObjects.GameObject[] | undefined;
  private _scene: Phaser.Scene;

  public constructor(scene: Phaser.Scene, key: string) {
    this._scene = scene;

    // this.createBackground();
    this.createMap(key);
    this.setupPhysics();
  }

  private createBackground(): void {
    const background = this._scene.add.image(
      0,
      window.innerHeight,
      'background'
    );
    background.setOrigin(0, 1);
  }

  private createMap(key: string): void {
    this.map = this._scene.make.tilemap({
      key
    });
    const tileset = this.map.addTilesetImage('tileset', 'tileset');
    this.map.createStaticLayer(0, tileset);
  }

  private setupPhysics(): void {
    if (this.map) {
      // get collision layer from map
      this.collisionGroups = this.map
        .getObjectLayer('Collision')
        .objects.map(box => {
          // create an invisible rectangle for each collision box
          const rect = this._scene.add.rectangle(
            (box.x && box.x) || 0,
            (box.y && box.y) || 0,
            (box.width && box.width) || 0,
            (box.height && box.height) || 0
          );
          rect.setOrigin(0, 0);

          // enable physics
          this._scene.physics.world.enable(rect);
          (rect.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
          (rect.body as Phaser.Physics.Arcade.Body).setImmovable(true);

          return rect;
        });
    }
  }
}

export default World;
