import { Enemie } from "./enemie.class.js";
import { Hitbox } from "./hitbox.class.js";
export class Boss extends Enemie {
    imgSrcRight = "../../assets/spritesheets/reaper/reaper.png";
    imgSrcLeft = "../../assets/spritesheets/reaper/reaperMirrored.png";
    width = 130;
    height = 130;
    frameWidth = 909.58;
    frameHeight = 908.88;
    hitbox;
    offsetX = -30;
    offsetY = -28;
    offsetWidth = -65;
    offsetHeight = -50;
    speed = 3;
    attackRange = 50;
    projectiles = [];
    projectileImgSrc = "../../assets/spritesheets/projectiles/Boss_Proj_spritesheet.png";
    projectileSpeed = 5;
    hp = 20;
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
        this.updateProj();
        this.removeProjectiles();
    }
    draw() {
        this.ctx.drawImage(this.img, this.frameWidth * this.spritePosition, this.frameHeight * this.animationRow, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
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
