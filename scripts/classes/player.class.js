import { Character } from "./character.superclass.js";
import { CharacterController } from "./characterController.js";
import { Projectile } from "./projectile.class.js";
import { Hitbox } from "./hitbox.class.js";
export class Player extends Character {
    speed = 5;
    jumpForce = 15;
    imageSrc = "../../assets/spritesheets/player/player.png";
    img;
    imageSrcRight = "../../assets/spritesheets/player/player.png";
    imageRight;
    imageSrcLeft = "../../assets/spritesheets/player/playerLeft2.png";
    imageLeft;
    frameWidth = 909.16;
    frameHeight = 909.16;
    animationRow = 0;
    spriteposition = 0;
    maxFrameCount = 23;
    state = {
        movement: { type: "grounded" },
        status: "idle",
        direction: "right",
    };
    controller;
    gravity;
    previousY = this.y;
    goundLevel = this.y;
    gameframe;
    dashdistance = 19;
    projectileSpeed = 10;
    projectiles = [];
    projectileImgSrc = "../../assets/spritesheets/projectiles/Player_Proj_spritesheet.png";
    hitbox;
    hitboxOffsetX = -25;
    hitboxOffsetY = -15;
    hitboxOffsetWidth = -50;
    hitboxOffsetHeight = -30;
    width = 100;
    height = 100;
    constructor(world, startingPositionX, startingPositionY) {
        super(world, startingPositionX, startingPositionY);
        this.img = new Image();
        this.img.src = this.imageSrc;
        this.controller = new CharacterController(this);
        this.gravity = world.gravity;
        this.imageRight = this.img;
        this.imageLeft = new Image();
        this.imageLeft.src = this.imageSrcLeft;
        this.gameframe = 0;
        this.hitbox = new Hitbox(this, this.width, this.height, this.hitboxOffsetX, this.hitboxOffsetY, this.hitboxOffsetWidth, this.hitboxOffsetHeight);
    }
    update() {
        this.checkDirection();
        this.checkAction();
        this.animateAction();
        this.checkGravity();
        this.updateProjectiles();
        this.removeProjectiles();
        this.hitbox.update();
    }
    draw() {
        this.ctx.drawImage(this.img, this.frameWidth * this.spriteposition, this.frameHeight * this.animationRow, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
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
        if (!this.controller.keyManager["a"] &&
            !this.controller.keyManager["d"] &&
            !this.controller.keyManager["ArrowLeft"] &&
            !this.controller.keyManager["ArrowRight"] &&
            this.state.movement.type === "grounded" &&
            this.state.status != "attacking" &&
            this.state.status != "dashing") {
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
        this.projectiles.push(new Projectile(this.projectileImgSrc, this, this.ctx));
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
    calculateGameFrame(spritetype) {
        if (this.state.direction === "right") {
            if (this.spriteposition > SpriteFrameCount[spritetype] - 1)
                this.spriteposition = -1;
            this.spriteposition++;
        }
        else {
            if (this.spriteposition <
                this.maxFrameCount - SpriteFrameCount[spritetype] + 1)
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
                if (this.spriteposition ===
                    SpriteFrameCount[SpriteTypes.jumpstart] - 1) {
                    this.state.movement.phase = "ascending";
                }
            }
            if (this.y < this.previousY && this.state.movement.phase !== "starting") {
                this.state.movement.phase = "ascending";
                this.previousY = this.y;
            }
            else {
                this.state.movement.phase = "descending";
                this.previousY = this.y;
            }
        }
    }
    stopAnimation(spriteTyp) {
        if (this.state.direction === "right") {
            if (this.spriteposition === SpriteFrameCount[spriteTyp]) {
                this.state.status = "moving";
                this.checkShoot(spriteTyp);
            }
        }
        else {
            if (this.spriteposition <
                this.maxFrameCount - SpriteFrameCount[spriteTyp] + 1) {
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
    checkShoot(spritetype) {
        if (spritetype === SpriteTypes.slashing ||
            spritetype === SpriteTypes.slahingAir) {
            this.shoot();
        }
    }
}
var SpriteTypes;
(function (SpriteTypes) {
    SpriteTypes[SpriteTypes["dying"] = 0] = "dying";
    SpriteTypes[SpriteTypes["descending"] = 1] = "descending";
    SpriteTypes[SpriteTypes["hurt"] = 2] = "hurt";
    SpriteTypes[SpriteTypes["idle"] = 3] = "idle";
    SpriteTypes[SpriteTypes["ascending"] = 4] = "ascending";
    SpriteTypes[SpriteTypes["jumpstart"] = 5] = "jumpstart";
    SpriteTypes[SpriteTypes["walking"] = 6] = "walking";
    SpriteTypes[SpriteTypes["throwing"] = 7] = "throwing";
    SpriteTypes[SpriteTypes["thowingAir"] = 8] = "thowingAir";
    SpriteTypes[SpriteTypes["slashing"] = 9] = "slashing";
    SpriteTypes[SpriteTypes["slahingAir"] = 10] = "slahingAir";
    SpriteTypes[SpriteTypes["sliding"] = 11] = "sliding";
})(SpriteTypes || (SpriteTypes = {}));
const SpriteFrameCount = {
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
