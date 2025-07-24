import { Enemie } from "./enemie.class.js";
import { Hitbox } from "./hitbox.class.js";
import { Projectile } from "./projectile.class.js";
export class Boss extends Enemie {
    img;
    imgRight;
    imgSrcRight = "../../assets/spritesheets/reaper/reaper.png";
    imgLeft;
    imgSrcLeft = "../../assets/spritesheets/reaper/reaperMirrored.png";
    width = 130;
    height = 130;
    frameWidth = 909.58;
    frameHeight = 908.88;
    spritePosition = 0;
    animationRow = 5;
    hitbox;
    offsetX = -30;
    offsetY = -28;
    offsetWidth = -65;
    offsetHeight = -50;
    speed = 3;
    attackRange = 50;
    state = { direction: "right", status: "idle" };
    projectiles = [];
    projectileImgSrc = "../../assets/spritesheets/projectiles/Boss_Proj_spritesheet.png";
    projectileSpeed = 5;
    attackCooldown = 3;
    isAttacking = false;
    attackOnCooldown = false;
    maxFrameCount = 23;
    constructor(world, startingX, startingY) {
        super(world, startingX, startingY);
        this.imgRight = new Image();
        this.imgRight.src = this.imgSrcRight;
        this.imgLeft = new Image();
        this.imgLeft.src = this.imgSrcLeft;
        this.hitbox = new Hitbox(this, this.width, this.height, this.offsetX, this.offsetY, this.offsetWidth, this.offsetHeight);
        this.img = this.imgRight;
    }
    update() {
        this.hitbox.update();
        this.checkDirection();
        this.decideAction();
        this.animateAction();
    }
    draw() {
        this.ctx.drawImage(this.img, this.frameWidth * this.spritePosition, this.frameHeight * this.animationRow, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
        this.hitbox.draw();
    }
    checkDirection() {
        if (this.world.player.x < this.x) {
            this.state.direction = "left";
            this.img = this.imgLeft;
        }
        else {
            this.state.direction = "right";
            this.img = this.imgRight;
        }
    }
    walk() {
        if (this.state.direction === "left") {
            this.x -= this.speed;
        }
        else {
            this.x += this.speed;
        }
    }
    attack() {
        this.projectiles.push(new Projectile(this.projectileImgSrc, this, this.ctx));
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
        if (this.isAttacking)
            return;
        if (this.world.player.x <= this.x + this.world.canvas.width &&
            this.world.player.x >= this.x - this.world.canvas.width) {
            this.state.status = "walking";
            this.walk();
        }
        if (this.world.player.x <= this.x + this.attackRange &&
            this.world.player.x >= this.x - this.attackRange &&
            !this.attackOnCooldown) {
            this.spritePosition = 0;
            this.isAttacking = true;
            this.state.status = "attacking";
        }
    }
    animateSprite(spriteTyp) {
        if (this.state.direction === "right") {
            if (this.spritePosition > SpriteFrameCount[spriteTyp] - 1)
                this.spritePosition = -1;
            this.spritePosition++;
        }
        else {
            if (this.spritePosition <
                this.maxFrameCount - SpriteFrameCount[spriteTyp] + 1)
                this.spritePosition = this.maxFrameCount + 1;
            this.spritePosition--;
        }
    }
    stopAnimation(spriteTyp) {
        if (this.state.direction === "right") {
            if (this.spritePosition > SpriteFrameCount[spriteTyp] - 1) {
                if (spriteTyp === SpriteTypes.dying) {
                    console.log("dead");
                }
                else if (spriteTyp === SpriteTypes.slashing) {
                    this.attack();
                    this.state.status = "walking";
                }
                else {
                    this.state.status = "idle";
                }
            }
        }
        else {
            if (this.spritePosition <
                this.maxFrameCount - SpriteFrameCount[spriteTyp] + 1) {
                if (spriteTyp === SpriteTypes.dying) {
                    console.log("dead");
                }
                else if (spriteTyp === SpriteTypes.slashing) {
                    this.attack();
                    this.state.status = "walking";
                }
                else {
                    this.state.status = "idle";
                }
            }
        }
    }
}
var SpriteTypes;
(function (SpriteTypes) {
    SpriteTypes[SpriteTypes["dying"] = 0] = "dying";
    SpriteTypes[SpriteTypes["hurt"] = 2] = "hurt";
    SpriteTypes[SpriteTypes["walking"] = 6] = "walking";
    SpriteTypes[SpriteTypes["slashing"] = 8] = "slashing";
})(SpriteTypes || (SpriteTypes = {}));
const SpriteFrameCount = {
    [SpriteTypes.dying]: 16,
    [SpriteTypes.hurt]: 11,
    [SpriteTypes.walking]: 23,
    [SpriteTypes.slashing]: 11,
};
