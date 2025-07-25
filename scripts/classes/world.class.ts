import { Player } from "./player.class.ts";
import { Boss } from "./boss.class.ts";
import { Zombie1, Zombie2 } from "./zombie.class.ts";

export class World {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  width!: number;
  height!: number;
  gravity: number = 1;

  player!: Player;
  enemies: (Boss | Zombie1 | Zombie2)[] = [];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
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

  update(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.update();
    this.updateEnemies();
  }

  draw(): void {
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
