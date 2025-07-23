import { World } from "./world.class.ts";

export class Character {
  world!: World;
  x!: number;
  y!: number;
  ctx!: CanvasRenderingContext2D;

  constructor(
    world: World,
    startingPositionX: number,
    startingPositionY: number
  ) {
    this.world = world;
    this.x = startingPositionX;
    this.y = startingPositionY;
    this.ctx = this.world.ctx;
  }
}
