import "./assets/styles.css";
import { Canvas } from "./setup-dom";

const canvas = new Canvas();
const context = canvas.getCanvasContext();

if (context) {
  context.fillStyle = "green";
  context.fillRect(10, 10, 150, 100);
}
