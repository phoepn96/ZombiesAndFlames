import { Enemie } from "./enemie.class.js";
import { Hitbox } from "./hitbox.class.js";
import { Projectile } from "./projectile.class.js";
export class Boss extends Enemie {
    img;
    imgSrc = "../../assets/spritesheets/reaper/reaper.png";
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
    constructor(world, startingX, startingY) {
        super(world, startingX, startingY);
        this.img = new Image();
        this.img.src = this.imgSrc;
        this.hitbox = new Hitbox(this, this.width, this.height, this.offsetX, this.offsetY, this.offsetWidth, this.offsetHeight);
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
        }
        else {
            this.state.direction = "right";
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
        if (this.world.player.x <= this.x + this.world.canvas.width &&
            this.world.player.x >= this.x - this.world.canvas.width &&
            !this.isAttacking) {
            this.state.status = "walking";
            this.walk();
        }
        if (this.world.player.x <= this.x + this.attackRange &&
            this.world.player.x >= this.x - this.attackRange &&
            !this.isAttacking) {
            this.spritePosition = 0;
            this.isAttacking = true;
            this.state.status = "attacking";
        }
    }
    animateSprite(spriteTyp) {
        if (this.state.direction === "right") {
            if (this.spritePosition > SpriteFrameCount[spriteTyp])
                this.spritePosition = -1;
            this.spritePosition++;
        }
    }
    stopAnimation(spriteTyp) {
        if (this.spritePosition > SpriteFrameCount[spriteTyp]) {
            if (spriteTyp === SpriteTypes.dying) {
                console.log("dead");
            }
            else if (spriteTyp === SpriteTypes.slashing) {
                this.attack();
            }
            else {
                this.state.status = "idle";
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
