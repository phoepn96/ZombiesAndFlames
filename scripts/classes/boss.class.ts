import { Enemie } from "./enemie.class.ts";
import { Hitbox } from "./hitbox.class.ts";
import { Projectile } from "./projectile.class.ts";
import { World } from "./world.class.ts";

export class Boss extends Enemie {
  imgSrcRight: string = "../../assets/spritesheets/reaper/reaper.png";
  imgSrcLeft: string = "../../assets/spritesheets/reaper/reaperMirrored.png";
  width: number = 130;
  height: number = 130;
  frameWidth: number = 909.58;
  frameHeight: number = 908.88;
  hitbox!: Hitbox;
  offsetX: number = -30;
  offsetY: number = -28;
  offsetWidth: number = -65;
  offsetHeight: number = -50;
  speed: number = 3;
  attackRange: number = 50;
  projectiles: Projectile[] = [];
  projectileImgSrc: string =
    "../../assets/spritesheets/projectiles/Boss_Proj_spritesheet.png";
  projectileSpeed: number = 5;
  hp: number = 20;

  constructor(world: World, startingX: number, startingY: number) {
    super(world, startingX, startingY);
    this.imgRight = new Image();
    this.imgRight.src = this.imgSrcRight;
    this.imgLeft = new Image();
    this.imgLeft.src = this.imgSrcLeft;
    this.hitbox = new Hitbox(
      this,
      this.width,
      this.height,
      this.offsetX,
      this.offsetY,
      this.offsetWidth,
      this.offsetHeight
    );
    this.img = this.imgRight;
  }

  update() {
    this.hitbox.update();
    this.checkDirection();
    this.decideAction();
    this.animateAction();
    this.updateProj();
    this.removeProjectiles();
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
    this.drawProj();
  }

  updateProj() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
    }
  }

  drawProj() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].draw();
    }
  }

  removeProjectiles() {
    this.projectiles = this.projectiles.filter((projectile) => {
      return !projectile.removeProj;
    });
  }
}
