import { Enemie } from "./enemie.class.ts";
import { Hitbox } from "./hitbox.class.ts";
import { World } from "./world.class.ts";

export class Zombie1 extends Enemie {
  img!: HTMLImageElement;
  imgRight!: HTMLImageElement;
  imgSrcRight: string = "../../assets/spritesheets/zombie1/zombie1.png";
  imgLeft!: HTMLImageElement;
  imgSrcLeft: string = "../../assets/spritesheets/zombie1/zombie1Mirrored.png";
  state: State = {
    direction: "right",
    status: "idle",
  };
  hitbox!: Hitbox;
  hp: number = 4;
  offsetX: number = 0;
  offsetY: number = 0;
  offsetWidth: number = 0;
  offsetHeight: number = 0;
  width: number = 100;
  height: number = 100;

  constructor(world: World, startingX: number, startingY: number) {
    super(world, startingX, startingY);
    this.imgRight = new Image();
    this.imgRight.src = this.imgSrcRight;
    this.imgLeft = new Image();
    this.imgLeft.src = this.imgSrcLeft;
    this.img = this.imgRight;

    this.hitbox = new Hitbox(
      this,
      this.width,
      this.height,
      this.offsetX,
      this.offsetY,
      this.offsetWidth,
      this.offsetHeight
    );
  }
}

export class Zombie2 extends Enemie {
  img!: HTMLImageElement;
  imgRight!: HTMLImageElement;
  imgSrcRight: string = "../../assets/spritesheets/zombie1/zombie2.png";
  imgLeft!: HTMLImageElement;
  imgSrcLeft: string = "../../assets/spritesheets/zombie1/zombie2Mirrored.png";
  state: State = {
    direction: "right",
    status: "idle",
  };
  hitbox!: Hitbox;
  hp: number = 4;
  offsetX: number = 0;
  offsetY: number = 0;
  offsetWidth: number = 0;
  offsetHeight: number = 0;
  width: number = 100;
  height: number = 100;

  constructor(world: World, startingX: number, startingY: number) {
    super(world, startingX, startingY);
    this.imgRight = new Image();
    this.imgRight.src = this.imgSrcRight;
    this.imgLeft = new Image();
    this.imgLeft.src = this.imgSrcLeft;
    this.img = this.imgRight;

    this.hitbox = new Hitbox(
      this,
      this.width,
      this.height,
      this.offsetX,
      this.offsetY,
      this.offsetWidth,
      this.offsetHeight
    );
  }
}

interface State {
  direction: "left" | "right";
  status: "attacking" | "hurt" | "dead" | "walking" | "idle";
}

enum SpriteTypes {
  dying = 0,
  hurt = 2,
  walking = 6,
  slashing = 8,
}

const SpriteFrameCount: Record<SpriteTypes, number> = {
  [SpriteTypes.dying]: 16,
  [SpriteTypes.hurt]: 11,
  [SpriteTypes.walking]: 23,
  [SpriteTypes.slashing]: 11,
};
