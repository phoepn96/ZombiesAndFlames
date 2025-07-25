import { Enemie } from "./enemie.class.ts";
import { Hitbox } from "./hitbox.class.ts";
import { Projectile } from "./projectile.class.ts";
import { World } from "./world.class.ts";

export class Boss extends Enemie {
  img!: HTMLImageElement;
  imgRight!: HTMLImageElement;
  imgSrcRight: string = "../../assets/spritesheets/reaper/reaper.png";
  imgLeft!: HTMLImageElement;
  imgSrcLeft: string = "../../assets/spritesheets/reaper/reaperMirrored.png";
  width: number = 130;
  height: number = 130;
  frameWidth: number = 909.58;
  frameHeight: number = 908.88;
  spritePosition: number = 0;
  animationRow: number = 5;
  hitbox!: Hitbox;
  offsetX: number = -30;
  offsetY: number = -28;
  offsetWidth: number = -65;
  offsetHeight: number = -50;
  speed: number = 3;
  attackRange: number = 50;
  state: State = { direction: "right", status: "idle" };
  projectiles: Projectile[] = [];
  projectileImgSrc: string =
    "../../assets/spritesheets/projectiles/Boss_Proj_spritesheet.png";
  projectileSpeed: number = 5;
  attackCooldown: number = 3;
  isAttacking: boolean = false;
  attackOnCooldown: boolean = false;
  maxFrameCount: number = 23;

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

  checkDirection() {
    if (this.world.player.x < this.x) {
      this.state.direction = "left";
      this.img = this.imgLeft;
    } else {
      this.state.direction = "right";
      this.img = this.imgRight;
    }
  }

  walk() {
    if (this.state.direction === "left") {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }
  }

  attack() {
    this.projectiles.push(
      new Projectile(this.projectileImgSrc, this, this.ctx)
    );
    console.log("shoot", this.projectiles);
    this.isAttacking = false;
    this.attackOnCooldown = true;
    setTimeout(() => {
      this.attackOnCooldown = false;
    }, this.attackCooldown * 1000);
  }

  animateAction() {
    if (this.state.status === "dead") {
      this.animationRow = SpriteTypes.dying;
      this.animateSprite(SpriteTypes.dying);
      this.stopAnimation(SpriteTypes.dying);
      return;
    }
    if (this.state.status === "hurt") {
      this.animationRow = SpriteTypes.hurt;
      this.animateSprite(SpriteTypes.hurt);
      this.stopAnimation(SpriteTypes.hurt);
      return;
    }
    if (this.state.status === "attacking") {
      this.animationRow = SpriteTypes.slashing;
      this.animateSprite(SpriteTypes.slashing);
      this.stopAnimation(SpriteTypes.slashing);
      return;
    }
    if (this.state.status === "walking") {
      this.animationRow = SpriteTypes.walking;
      this.animateSprite(SpriteTypes.walking);
      return;
    }
  }

  decideAction() {
    if (this.isAttacking) return;

    if (
      this.world.player.x <= this.x + this.world.canvas.width &&
      this.world.player.x >= this.x - this.world.canvas.width
    ) {
      this.state.status = "walking";
      this.walk();
    }
    if (
      this.world.player.x <= this.x + this.attackRange &&
      this.world.player.x >= this.x - this.attackRange &&
      !this.attackOnCooldown
    ) {
      this.spritePosition = 0;
      this.isAttacking = true;
      this.state.status = "attacking";
    }
  }

  animateSprite(spriteTyp: SpriteTypes) {
    if (this.state.direction === "right") {
      if (this.spritePosition > SpriteFrameCount[spriteTyp] - 1)
        this.spritePosition = -1;
      this.spritePosition++;
    } else {
      if (
        this.spritePosition <
        this.maxFrameCount - SpriteFrameCount[spriteTyp] + 1
      )
        this.spritePosition = this.maxFrameCount + 1;
      this.spritePosition--;
    }
  }

  stopAnimation(spriteTyp: SpriteTypes) {
    if (this.state.direction === "right") {
      if (this.spritePosition > SpriteFrameCount[spriteTyp] - 1) {
        if (spriteTyp === SpriteTypes.dying) {
          console.log("dead");
        } else if (spriteTyp === SpriteTypes.slashing) {
          this.attack();
          this.state.status = "walking";
        } else {
          this.state.status = "idle";
        }
      }
    } else {
      if (
        this.spritePosition <
        this.maxFrameCount - SpriteFrameCount[spriteTyp] + 1
      ) {
        if (spriteTyp === SpriteTypes.dying) {
          console.log("dead");
        } else if (spriteTyp === SpriteTypes.slashing) {
          this.attack();
          this.state.status = "walking";
        } else {
          this.state.status = "idle";
        }
      }
    }
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
