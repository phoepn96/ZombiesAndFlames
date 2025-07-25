import { Character } from "./character.superclass.ts";
import { World } from "./world.class.ts";
import { Boss } from "./boss.class.ts";
import { Projectile } from "./projectile.class.ts";

export class Enemie extends Character {
  maxFrameCount: number = 23;
  spritePosition: number = 0;
  animationRow: number = 5;
  attackCooldown: number = 3;
  isAttacking: boolean = false;
  attackOnCooldown: boolean = false;
  speed!: number;
  attackRange!: number;
  projectiles: Projectile[] = [];
  img!: HTMLImageElement;
  imgLeft!: HTMLImageElement;
  imgRight!: HTMLImageElement;

  state: State = { direction: "right", status: "idle" };
  constructor(world: World, startingX: number, startingY: number) {
    super(world, startingX, startingY);
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

  checkDirection() {
    if (this.world.player.x < this.x) {
      this.state.direction = "left";
      this.img = this.imgLeft;
    } else {
      this.state.direction = "right";
      this.img = this.imgRight;
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

  attack() {
    if (this instanceof Boss) {
      this.projectiles.push(
        new Projectile(this.projectileImgSrc, this, this.ctx)
      );
      console.log("shoot", this.projectiles);
      this.isAttacking = false;
      this.attackOnCooldown = true;
      setTimeout(() => {
        this.attackOnCooldown = false;
      }, this.attackCooldown * 1000);
    } else {
      this.isAttacking = false;
      this.attackOnCooldown = true;
      setTimeout(() => {
        this.attackOnCooldown = false;
      }, this.attackCooldown * 1000);
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

  walk() {
    if (this.state.direction === "left") {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
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
