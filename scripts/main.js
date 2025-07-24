import { World } from "./classes/world.class.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const targetFps = 45;
let lastTime = 0;
let accumulator = 0;
const targetFrameTime = 1000 / targetFps;
const world = new World(canvas, ctx);
function gameLoop(timestamp) {
    if (!lastTime)
        lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    accumulator += deltaTime;
    if (accumulator >= targetFrameTime) {
        world.update();
        world.draw();
        accumulator -= targetFrameTime;
    }
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
}
console.log(world);
requestAnimationFrame(gameLoop);
