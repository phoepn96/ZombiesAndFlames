import { Enemie } from "./enemie.class.ts";
import { Hitbox } from "./hitbox.class.ts";
import { World } from "./world.class.ts";

export class Zombie1 extends Enemie {
  imgSrcRight: string = "../../assets/spritesheets/zombie1/zombie1.png";
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
  frameWidth: number = 909.58;
  frameHeight: number = 908.88;

  constructor(world: World, startingX: number, startingY: number) {
    super(world, startingX, startingY);
    this.imgRight = new Image();
    this.imgRight.src = this.imgSrcRight;
    this.imgLeft = new Image();
    this.imgLeft.src = this.imgSrcLeft;
    this.img = this.imgRight;
    this.speed = 2;
    this.attackRange = 50;

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

  update() {
    this.hitbox.update();
    this.checkDirection();
    this.decideAction();
    this.animateAction();
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.frameWidth * this.spritePosition,
      this.frameHeight * this.animationRow,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.hitbox.draw();
  }
}

export class Zombie2 extends Enemie {
  imgSrcRight: string = "../../assets/spritesheets/zombie2/zombie2.png";
  imgSrcLeft: string = "../../assets/spritesheets/zombie2/zombie2Mirrored.png";
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
  frameWidth: number = 909.58;
  frameHeight: number = 908.88;

  constructor(world: World, startingX: number, startingY: number) {
    super(world, startingX, startingY);
    this.imgRight = new Image();
    this.imgRight.src = this.imgSrcRight;
    this.imgLeft = new Image();
    this.imgLeft.src = this.imgSrcLeft;
    this.img = this.imgRight;
    this.speed = 2;
    this.attackRange = 50;

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
  update() {
    this.hitbox.update();
    this.checkDirection();
    this.decideAction();
    this.animateAction();
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.frameWidth * this.spritePosition,
      this.frameHeight * this.animationRow,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.hitbox.draw();
  }
}

interface State {
  direction: "left" | "right";
  status: "attacking" | "hurt" | "dead" | "walking" | "idle";
}
