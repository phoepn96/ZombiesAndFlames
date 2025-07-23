import { Character } from "./character.superclass.ts";
import { World } from "./world.class.ts";

export class Enemie extends Character {
  constructor(world: World, startingX: number, startingY: number) {
    super(world, startingX, startingY);
  }
}
