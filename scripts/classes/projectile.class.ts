import { Boss } from "./boss.class.ts";
import { Hitbox } from "./hitbox.class.ts";
import { Player } from "./player.class.ts";
import { World } from "./world.class.ts";

export class Projectile {
  imgSrc!: string;
  img!: HTMLImageElement;
  x!: number;
  y!: number;
  world!: World;
  projectileSpeed!: number;
  originClass!: Player | Boss;
  ctx!: CanvasRenderingContext2D;
  spriteWidth!: number;
  spriteHeight!: number;
  spritePosition: number = 0;
  spriteRow!: number;
  origin: string = "player";
  removeProj: boolean = false;
  direction: string = "right";
  projectileSizeWidth!: number;
  projectileSizeHeight!: number;
  hitbox!: Hitbox;
  hitboxOffsetX: number = -50;
  hitboxOffsetY: number = -40;
  hitboxOffsetWidth: number = -80;
  hitboxOffsetHeight: number = -70;
  bossProjDuration: number = 2;
  counter: number = 0;

  constructor(
    img: string,
    originClass: Player | Boss,
    ctx: CanvasRenderingContext2D
  ) {
    this.imgSrc = img;
    this.img = new Image();
    this.img.src = this.imgSrc;
    this.x = originClass.x;
    this.y = originClass.y;
    this.world = originClass.world;
    this.projectileSpeed = originClass.projectileSpeed;
    this.originClass = originClass;
    this.ctx = ctx;
    this.direction = originClass.state.direction;

    if (originClass instanceof Player) {
      this.spriteRow = 0;
      this.spriteWidth = 1660;
      this.spriteHeight = 1070;
      this.origin = "player";
      this.projectileSizeHeight = 100;
      this.projectileSizeWidth = 150;
      this.hitboxOffsetX = -50;
      this.hitboxOffsetY = -40;
      this.hitboxOffsetWidth = -80;
      this.hitboxOffsetHeight = -70;
    } else {
      this.spriteRow = 0;
      this.spriteWidth = 339;
      this.spriteHeight = 404;
      this.projectileSizeHeight = 100;
      this.projectileSizeWidth = 80;
      this.hitboxOffsetX = -15;
      this.hitboxOffsetY = -20;
      this.hitboxOffsetWidth = -40;
      this.hitboxOffsetHeight = -20;
      this.origin = "boss";
      this.y = originClass.y + 10;
      if (this.direction === "right") {
        this.x = originClass.x + originClass.width - 40;
      } else {
        this.x = originClass.x - 20;
      }
    }

    this.hitbox = new Hitbox(
      this,
      this.projectileSizeWidth,
      this.projectileSizeHeight,
      this.hitboxOffsetX,
      this.hitboxOffsetY,
      this.hitboxOffsetWidth,
      this.hitboxOffsetHeight
    );
  }

  update() {
    this.moveProj();
    this.checkIfOutOfScreen();
    this.animateProj();
    this.hitbox.update();
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.spriteWidth * this.spritePosition,
      this.spriteHeight * this.spriteRow,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.projectileSizeWidth,
      this.projectileSizeHeight
    );
    this.hitbox.draw();
  }

  moveProj() {
    if (this.origin === "boss") return;
    if (this.direction === "right") {
      this.x += this.projectileSpeed;
    } else {
      this.x -= this.projectileSpeed;
    }
  }

  checkIfOutOfScreen() {
    if (this.x + this.spriteWidth < 0) {
      this.removeProj = true;
    } else if (this.x > this.world.width) {
      this.removeProj = true;
    }
  }

  animateProj() {
    if (this.origin === "player") {
      if (this.spritePosition > 15) this.spritePosition = 10;
      this.spritePosition++;
    } else {
      if (this.spritePosition > 51) {
        if (this.counter < this.bossProjDuration) {
          this.spritePosition = -1;
          this.counter++;
        } else {
          this.removeProj = true;
        }
      }
      this.spritePosition++;
    }
  }
}
