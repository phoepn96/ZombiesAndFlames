import { Character } from "./character.superclass.ts";
import { Player } from "./player.class.ts";
import { Projectile } from "./projectile.class.ts";
import { World } from "./world.class.ts";

export class Hitbox {
  originClass!: Object;
  x!: number;
  y!: number;
  world!: World;

  constructor(originClass: Player | Projectile) {
    this.x = originClass.x;
    this.y = originClass.y;
    this.world = originClass.world;
  }
}
