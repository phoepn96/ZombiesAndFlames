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
    width;
    height;
    spritePosition = 0;
    spriteRow;
    origin = "player";
    removeProj = false;
    direction = "right";
    projectileSizeWidth;
    projectileSizeHeight;
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
        if (originClass instanceof Player) {
            this.spriteRow = 0;
            this.width = 1666;
            this.height = 1070;
            this.origin = "player";
            this.projectileSizeHeight = 300;
            this.projectileSizeWidth = 400;
        }
        else {
            this.width = 20;
            this.height = 20;
            this.origin = "boss";
        }
        this.direction = originClass.playerstate.direction;
    }
    update() {
        this.moveProj();
        this.checkIfOutOfScreen();
        this.animateProj();
    }
    draw() {
        this.ctx.drawImage(this.img, this.width * this.spritePosition, this.height * this.spriteRow, this.width, this.height, this.x, this.y, this.projectileSizeWidth, this.projectileSizeHeight);
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
        if (this.x + this.width < 0) {
            this.removeProj = true;
        }
        else if (this.x > this.world.width) {
            this.removeProj = true;
        }
    }
    animateProj() {
        if (this.origin === "player") {
            if (this.spritePosition > 40)
                this.removeProj = true;
            this.spritePosition++;
        }
        else {
        }
    }
}
