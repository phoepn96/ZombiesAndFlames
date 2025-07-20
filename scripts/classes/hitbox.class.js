export class Hitbox {
    originClass;
    x;
    y;
    world;
    constructor(originClass) {
        this.x = originClass.x;
        this.y = originClass.y;
        this.world = originClass.world;
    }
}
