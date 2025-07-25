import { Player } from "./player.class.js";
import { Boss } from "./boss.class.js";
import { Zombie1, Zombie2 } from "./zombie.class.js";
export class World {
    canvas;
    ctx;
    width;
    height;
    gravity = 1;
    player;
    enemies = [];
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        this.player = new Player(this, 50, 280);
        this.enemies = [
            new Boss(this, 500, 255),
            new Zombie1(this, 300, 255),
            new Zombie2(this, 100, 280),
        ];
    }
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.update();
        this.updateEnemies();
    }
    draw() {
        this.player.draw();
        this.drawEnemies();
    }
    drawEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw();
        }
    }
    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
        }
    }
}
