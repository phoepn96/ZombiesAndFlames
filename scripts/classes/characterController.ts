import { Player } from "./player.class";

export class CharacterController {
  keyManager: { [key: string]: boolean } = {};
  attackHandler: boolean = false;
  dashHandeler: boolean = false;

  constructor(private player: Player) {
    window.addEventListener("keydown", (event) => {
      this.keyManager[event.key] = true;

      if (event.key === "d" || event.key === "ArrowRight") {
        player.playerstate.direction = "right";
        player.playerstate.status = "moving";
        this.keyManager["a"] = false;
        this.keyManager["ArrowLeft"] = false;
      }

      if (event.key === "a" || event.key === "ArrowLeft") {
        player.playerstate.direction = "left";
        player.playerstate.status = "moving";
        this.keyManager["d"] = false;
        this.keyManager["ArrowRight"] = false;
      }

      if (
        player.playerstate.movement.type === "grounded" &&
        player.playerstate.status != "attacking"
      ) {
        if (event.key === " ") {
          player.spriteposition = 0;
          player.playerstate.movement = {
            type: "airborne",
            phase: "starting",
          };
        }
      }
      if (event.key === "Control") {
        if (!this.dashHandeler && this.player.playerstate.status != "dashing") {
          player.spriteposition = 0;
          player.playerstate.status = "dashing";
          this.dashHandeler = true;
        }
      }
      if (event.key === "f") {
        if (
          !this.attackHandler &&
          this.player.playerstate.status != "attacking"
        ) {
          player.spriteposition = 0;
          player.playerstate.status = "attacking";
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
        this.player.playerstate.status != "attacking" &&
        this.player.playerstate.status != "dashing"
      ) {
        player.playerstate.status = "idle";
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
