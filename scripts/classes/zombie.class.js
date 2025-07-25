import { Enemie } from "./enemie.class.js";
import { Hitbox } from "./hitbox.class.js";
export class Zombie1 extends Enemie {
    imgSrcRight = "../../assets/spritesheets/zombie1/zombie1.png";
    imgSrcLeft = "../../assets/spritesheets/zombie1/zombie1Mirrored.png";
    state = {
        direction: "right",
        status: "idle",
    };
    hitbox;
    hp = 4;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;
    width = 100;
    height = 100;
    frameWidth = 909.58;
    frameHeight = 908.88;
    constructor(world, startingX, startingY) {
        super(world, startingX, startingY);
        this.imgRight = new Image();
        this.imgRight.src = this.imgSrcRight;
        this.imgLeft = new Image();
        this.imgLeft.src = this.imgSrcLeft;
        this.img = this.imgRight;
        this.speed = 2;
        this.attackRange = 50;
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
}
export class Zombie2 extends Enemie {
    imgSrcRight = "../../assets/spritesheets/zombie2/zombie2.png";
    imgSrcLeft = "../../assets/spritesheets/zombie2/zombie2Mirrored.png";
    state = {
        direction: "right",
        status: "idle",
    };
    hitbox;
    hp = 4;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;
    width = 100;
    height = 100;
    frameWidth = 909.58;
    frameHeight = 908.88;
    constructor(world, startingX, startingY) {
        super(world, startingX, startingY);
        this.imgRight = new Image();
        this.imgRight.src = this.imgSrcRight;
        this.imgLeft = new Image();
        this.imgLeft.src = this.imgSrcLeft;
        this.img = this.imgRight;
        this.speed = 2;
        this.attackRange = 50;
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
}
