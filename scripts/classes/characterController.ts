import { Player } from "./player.class.ts";

export class CharacterController {
  keyManager: { [key: string]: boolean } = {};
  attackHandler: boolean = false;
  dashHandeler: boolean = false;

  constructor(private player: Player) {
    window.addEventListener("keydown", (event) => {
      this.keyManager[event.key] = true;

      if (event.key === "d" || event.key === "ArrowRight") {
        player.state.direction = "right";
        player.state.status = "moving";
        this.keyManager["a"] = false;
        this.keyManager["ArrowLeft"] = false;
      }

      if (event.key === "a" || event.key === "ArrowLeft") {
        player.state.direction = "left";
        player.state.status = "moving";
        this.keyManager["d"] = false;
        this.keyManager["ArrowRight"] = false;
      }

      if (
        player.state.movement.type === "grounded" &&
        player.state.status != "attacking"
      ) {
        if (event.key === " ") {
          player.spriteposition = 0;
          player.state.movement = {
            type: "airborne",
            phase: "starting",
          };
        }
      }
      if (event.key === "Control") {
        if (!this.dashHandeler && this.player.state.status != "dashing") {
          player.spriteposition = 0;
          player.state.status = "dashing";
          this.dashHandeler = true;
        }
      }
      if (event.key === "f") {
        if (!this.attackHandler && this.player.state.status != "attacking") {
          player.spriteposition = 0;
          player.state.status = "attacking";
          this.attackHandler = true;
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keyManager[event.key] = false;
      if (
        this.keyManager["d"] === false &&
        this.keyManager["ArrowLeft"] === false &&
        this.keyManager["a"] === false &&
        this.keyManager["ArrowRight"] === false &&
        this.player.state.status != "attacking" &&
        this.player.state.status != "dashing"
      ) {
        player.state.status = "idle";
      }

      if (event.key === "Control") {
        this.dashHandeler = false;
      }
      if (event.key === "f") {
        this.attackHandler = false;
      }
    });
  }
}
