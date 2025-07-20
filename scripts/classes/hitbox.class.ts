import { Character } from "./character.superclass.ts";
import { Player } from "./player.class.ts";
import { Projectile } from "./projectile.class.ts";
import { World } from "./world.class.ts";

export class Hitbox {
  originClass!: Player | Projectile;
  x!: number;
  y!: number;
  world!: World;
  ctx!: CanvasRenderingContext2D;
  width!: number;
  height!: number;
  offsetX!: number;
  offsetY!: number;
  offsetWidth!: number;
  offsetHeight!: number;

  constructor(
    originClass: Player | Projectile,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    offsetWidth: number,
    offsetHeight: number
  ) {
    this.world = originClass.world;
    this.ctx = originClass.ctx;
    this.originClass = originClass;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.offsetWidth = offsetWidth;
    this.offsetHeight = offsetHeight;
    this.x = originClass.x;
    this.y = originClass.y;
    this.width = width + offsetWidth;
    this.height = height + offsetHeight;
    console.log(ctx);
  }

  update() {
    this.x = this.originClass.x - this.offsetX;
    this.y = this.originClass.y - this.offsetY;
  }
  draw() {
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
