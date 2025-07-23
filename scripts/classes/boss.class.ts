import { Enemie } from "./enemie.class.ts";
import { Hitbox } from "./hitbox.class.ts";
import { Projectile } from "./projectile.class.ts";
import { World } from "./world.class.ts";

export class Boss extends Enemie {
  img!: HTMLImageElement;
  imgSrc: string = "../../assets/spritesheets/reaper/reaper.png";
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

  constructor(world: World, startingX: number, startingY: number) {
    super(world, startingX, startingY);
    this.img = new Image();
    this.img.src = this.imgSrc;
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

  checkDirection() {
    if (this.world.player.x < this.x) {
      this.state.direction = "left";
    } else {
      this.state.direction = "right";
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
    if (
      this.world.player.x <= this.x + this.world.canvas.width &&
      this.world.player.x >= this.x - this.world.canvas.width &&
      !this.isAttacking
    ) {
      this.state.status = "walking";
      this.walk();
    }
    if (
      this.world.player.x <= this.x + this.attackRange &&
      this.world.player.x >= this.x - this.attackRange &&
      !this.isAttacking
    ) {
      this.spritePosition = 0;
      this.isAttacking = true;
      this.state.status = "attacking";
    }
  }

  animateSprite(spriteTyp: SpriteTypes) {
    if (this.state.direction === "right") {
      if (this.spritePosition > SpriteFrameCount[spriteTyp])
        this.spritePosition = -1;
      this.spritePosition++;
    }
  }

  stopAnimation(spriteTyp: SpriteTypes) {
    if (this.spritePosition > SpriteFrameCount[spriteTyp]) {
      if (spriteTyp === SpriteTypes.dying) {
        console.log("dead");
      } else if (spriteTyp === SpriteTypes.slashing) {
        this.attack();
      } else {
        this.state.status = "idle";
      }
    }
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
