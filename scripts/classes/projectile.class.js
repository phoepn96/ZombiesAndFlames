import { Hitbox } from "./hitbox.class.js";
import { Player } from "./player.class.js";
export class Projectile {
    imgSrc;
    img;
    x;
    y;
    world;
    projectileSpeed;
    originClass;
    ctx;
    spriteWidth;
    spriteHeight;
    spritePosition = 0;
    spriteRow;
    origin = "player";
    removeProj = false;
    direction = "right";
    projectileSizeWidth;
    projectileSizeHeight;
    hitbox = new Hitbox(this, this.ctx, this.projectileSizeWidth, this.projectileSizeHeight, 0, 0, 0, 0);
    constructor(img, originClass, ctx) {
        console.log("proj init");
        this.imgSrc = img;
        this.img = new Image();
        this.img.src = this.imgSrc;
        this.x = originClass.x;
        this.y = originClass.y;
        this.world = originClass.world;
        this.projectileSpeed = originClass.projectileSpeed;
        this.originClass = originClass;
        this.ctx = ctx;
        console.log(this.ctx);
        if (originClass instanceof Player) {
            this.spriteRow = 0;
            this.spriteWidth = 1660;
            this.spriteHeight = 1070;
            this.origin = "player";
            this.projectileSizeHeight = 100;
            this.projectileSizeWidth = 150;
        }
        else {
            this.spriteWidth = 20;
            this.spriteHeight = 20;
            this.origin = "boss";
        }
        this.direction = originClass.playerstate.direction;
    }
    update() {
        this.moveProj();
        this.checkIfOutOfScreen();
        this.animateProj();
        this.hitbox.update();
    }
    draw() {
        this.ctx.drawImage(this.img, this.spriteWidth * this.spritePosition, this.spriteHeight * this.spriteRow, this.spriteWidth, this.spriteHeight, this.x, this.y, this.projectileSizeWidth, this.projectileSizeHeight);
        this.hitbox.draw();
    }
    moveProj() {
        if (this.direction === "right") {
            this.x += this.projectileSpeed;
        }
        else {
            this.x -= this.projectileSpeed;
        }
    }
    checkIfOutOfScreen() {
        if (this.x + this.spriteWidth < 0) {
            this.removeProj = true;
        }
        else if (this.x > this.world.width) {
            this.removeProj = true;
        }
    }
    animateProj() {
        if (this.origin === "player") {
            if (this.spritePosition > 15)
                this.spritePosition = 10;
            this.spritePosition++;
        }
        else {
        }
    }
}
