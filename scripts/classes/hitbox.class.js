export class Hitbox {
    originClass;
    x;
    y;
    world;
    ctx;
    width;
    height;
    offsetX;
    offsetY;
    offsetWidth;
    offsetHeight;
    constructor(originClass, ctx, width, height, offsetX, offsetY, offsetWidth, offsetHeight) {
        this.world = originClass.world;
        this.ctx = originClass.ctx;
        this.originClass = originClass;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.offsetWidth = offsetWidth;
        this.offsetHeight = offsetHeight;
        this.x = originClass.x;
        this.y = originClass.y;
        this.width = width + offsetWidth;
        this.height = height + offsetHeight;
        console.log(ctx);
    }
    update() {
        this.x = this.originClass.x - this.offsetX;
        this.y = this.originClass.y - this.offsetY;
    }
    draw() {
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
