import { Character } from "./character.superclass.ts";
import { World } from "./world.class.ts";
import { CharacterController } from "./characterController.ts";
import { Projectile } from "./projectile.class.ts";
import { Hitbox } from "./hitbox.class.ts";

export class Player extends Character {
  speed: number = 5;
  jumpForce: number = 15;
  imageSrc: string = "../../assets/spritesheets/player/player.png";
  img!: HTMLImageElement;
  imageSrcRight: string = "../../assets/spritesheets/player/player.png";
  imageRight!: HTMLImageElement;
  imageSrcLeft: string = "../../assets/spritesheets/player/playerLeft2.png";
  imageLeft!: HTMLImageElement;
  frameWidth: number = 909.16;
  frameHeight: number = 909.16;
  animationRow: number = 0;
  spriteposition: number = 0;
  maxFrameCount: number = 23;
  state: Playerstate = {
    movement: { type: "grounded" },
    status: "idle",
    direction: "right",
  };
  controller!: CharacterController;
  gravity!: number;
  previousY: number = this.y;
  goundLevel: number = this.y;
  gameframe!: number;
  dashdistance: number = 19;
  projectileSpeed = 10;
  projectiles: Projectile[] = [];
  projectileImgSrc: string =
    "../../assets/spritesheets/projectiles/Player_Proj_spritesheet.png";
  hitbox!: Hitbox;
  hitboxOffsetX: number = -25;
  hitboxOffsetY: number = -15;
  hitboxOffsetWidth: number = -50;
  hitboxOffsetHeight: number = -30;
  width: number = 100;
  height: number = 100;

  constructor(
    world: World,
    startingPositionX: number,
    startingPositionY: number
  ) {
    super(world, startingPositionX, startingPositionY);
    this.img = new Image();
    this.img.src = this.imageSrc;
    this.controller = new CharacterController(this);
    this.gravity = world.gravity;
    this.imageRight = this.img;
    this.imageLeft = new Image();
    this.imageLeft.src = this.imageSrcLeft;
    this.gameframe = 0;
    this.hitbox = new Hitbox(
      this,
      this.width,
      this.height,
      this.hitboxOffsetX,
      this.hitboxOffsetY,
      this.hitboxOffsetWidth,
      this.hitboxOffsetHeight
    );
  }

  update(): void {
    this.checkDirection();
    this.checkAction();
    this.animateAction();
    this.checkGravity();
    this.updateProjectiles();
    this.removeProjectiles();
    this.hitbox.update();
  }

  draw(): void {
    this.ctx.drawImage(
      this.img,
      this.frameWidth * this.spriteposition,
      this.frameHeight * this.animationRow,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.drawProjectiles();
    this.hitbox.draw();
  }

  checkDirection() {
    if (this.state.direction === "right") {
      this.img = this.imageRight;
      return;
    }

    this.img = this.imageLeft;
  }

  checkAction() {
    this.checkMovementState();
    this.checkIdle();
    if (this.state.movement.type === "airborne") {
      this.jump();
    }
    if (this.state.status === "moving") {
      this.move();
    }
    if (this.state.status === "dashing") {
      this.dash();
    }
  }

  checkIdle() {
    if (
      !this.controller.keyManager["a"] &&
      !this.controller.keyManager["d"] &&
      !this.controller.keyManager["ArrowLeft"] &&
      !this.controller.keyManager["ArrowRight"] &&
      this.state.movement.type === "grounded" &&
      this.state.status != "attacking" &&
      this.state.status != "dashing"
    ) {
      this.state.status = "idle";
    }
  }

  dash() {
    if (this.state.direction === "right") {
      this.x += this.dashdistance;
      return;
    }
    this.x -= this.dashdistance;
  }

  shoot() {
    this.projectiles.push(
      new Projectile(this.projectileImgSrc, this, this.ctx)
    );
  }

  move() {
    if (this.state.direction === "right") {
      this.x += this.speed;
      return;
    }
    this.x -= this.speed;
  }

  jump() {
    this.y -= this.jumpForce;
  }

  animateAction() {
    if (this.state.status === "dead") {
      this.animationRow == SpriteTypes.dying;
      this.calculateGameFrame(SpriteTypes.dying);
      return;
    }
    if (this.state.status === "hurt") {
      this.animationRow === SpriteTypes.hurt;
      this.calculateGameFrame(SpriteTypes.hurt);
      return;
    }
    if (this.state.movement.type === "airborne") {
      if (this.state.status === "dashing") {
        this.animationRow = SpriteTypes.sliding;
        this.calculateGameFrame(SpriteTypes.sliding);
        this.stopAnimation(SpriteTypes.sliding);
        return;
      }

      if (this.state.status === "attacking") {
        this.animationRow = SpriteTypes.slahingAir;
        this.calculateGameFrame(SpriteTypes.slahingAir);
        this.stopAnimation(SpriteTypes.slahingAir);
        return;
      }
      if (this.state.movement.phase === "starting") {
        this.animationRow = SpriteTypes.jumpstart;
        this.calculateGameFrame(SpriteTypes.jumpstart);
        this.stopAnimation(SpriteTypes.jumpstart);
        return;
      }
      if (this.state.movement.phase === "ascending") {
        this.animationRow = SpriteTypes.ascending;
        this.calculateGameFrame(SpriteTypes.ascending);
        return;
      }
      if (this.state.movement.phase === "descending") {
        this.animationRow = SpriteTypes.descending;
        this.calculateGameFrame(SpriteTypes.descending);
        return;
      }
    }

    if (this.state.movement.type === "grounded") {
      if (this.state.status === "attacking") {
        this.animationRow = SpriteTypes.slashing;
        this.calculateGameFrame(SpriteTypes.slashing);
        this.stopAnimation(SpriteTypes.slashing);
        return;
      }

      if (this.state.status === "dashing") {
        this.animationRow = SpriteTypes.sliding;
        this.calculateGameFrame(SpriteTypes.sliding);
        this.stopAnimation(SpriteTypes.sliding);
      }

      if (this.state.status === "idle") {
        this.animationRow = SpriteTypes.idle;
        this.calculateGameFrame(SpriteTypes.idle);
        return;
      }
      if (this.state.status === "moving") {
        this.animationRow = SpriteTypes.walking;
        this.calculateGameFrame(SpriteTypes.walking);
        return;
      }
    }
  }

  calculateGameFrame(spritetype: SpriteTypes) {
    if (this.state.direction === "right") {
      if (this.spriteposition > SpriteFrameCount[spritetype] - 1)
        this.spriteposition = -1;
      this.spriteposition++;
    } else {
      if (
        this.spriteposition <
        this.maxFrameCount - SpriteFrameCount[spritetype] + 1
      )
        this.spriteposition = this.maxFrameCount + 1;
      this.spriteposition--;
    }
  }

  checkMovementState() {
    if (this.y > this.goundLevel) {
      this.state.movement.type = "grounded";
      this.y = this.goundLevel;
      this.previousY = this.goundLevel;
      this.gravity = 1;
    }
    if (this.state.movement.type === "airborne") {
      if (this.state.movement.phase === "starting") {
        if (
          this.spriteposition ===
          SpriteFrameCount[SpriteTypes.jumpstart] - 1
        ) {
          this.state.movement.phase = "ascending";
        }
      }
      if (this.y < this.previousY && this.state.movement.phase !== "starting") {
        this.state.movement.phase = "ascending";
        this.previousY = this.y;
      } else {
        this.state.movement.phase = "descending";
        this.previousY = this.y;
      }
    }
  }

  stopAnimation(spriteTyp: SpriteTypes) {
    if (this.state.direction === "right") {
      if (this.spriteposition === SpriteFrameCount[spriteTyp]) {
        this.state.status = "moving";
        this.checkShoot(spriteTyp);
      }
    } else {
      if (
        this.spriteposition <
        this.maxFrameCount - SpriteFrameCount[spriteTyp] + 1
      ) {
        this.state.status = "moving";
        this.checkShoot(spriteTyp);
      }
    }
  }

  checkGravity() {
    if (this.y < this.goundLevel) {
      this.y += this.gravity;
      this.gravity += 0.8;
    }
  }

  updateProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
  }

  drawProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.draw();
    });
  }

  removeProjectiles() {
    this.projectiles = this.projectiles.filter((projectile) => {
      return !projectile.removeProj;
    });
  }

  checkShoot(spritetype: SpriteTypes) {
    if (
      spritetype === SpriteTypes.slashing ||
      spritetype === SpriteTypes.slahingAir
    ) {
      this.shoot();
    }
  }
}

interface Playerstate {
  movement:
    | { type: "grounded" }
    | { type: "airborne"; phase: "ascending" | "descending" | "starting" };
  status:
    | "hurt"
    | "dead"
    | "attacking"
    | "idle"
    | "moving"
    | "floating"
    | "dashing"
    | "chill";
  direction: "left" | "right";
}

enum SpriteTypes {
  dying = 0,
  descending = 1,
  hurt = 2,
  idle = 3,
  ascending = 4,
  jumpstart = 5,
  walking = 6,
  throwing = 7,
  thowingAir = 8,
  slashing = 9,
  slahingAir = 10,
  sliding = 11,
}

const SpriteFrameCount: Record<SpriteTypes, number> = {
  [SpriteTypes.dying]: 14,
  [SpriteTypes.descending]: 5,
  [SpriteTypes.hurt]: 11,
  [SpriteTypes.idle]: 17,
  [SpriteTypes.ascending]: 5,
  [SpriteTypes.jumpstart]: 5,
  [SpriteTypes.walking]: 23,
  [SpriteTypes.throwing]: 11,
  [SpriteTypes.thowingAir]: 11,
  [SpriteTypes.slashing]: 11,
  [SpriteTypes.slahingAir]: 11,
  [SpriteTypes.sliding]: 5,
};
