export class Character {
    world;
    x;
    y;
    ctx;
    constructor(world, startingPositionX, startingPositionY) {
        this.world = world;
        this.x = startingPositionX;
        this.y = startingPositionY;
        this.ctx = this.world.ctx;
    }
}
