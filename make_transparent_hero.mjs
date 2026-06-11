import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { Image, createCanvas } = require("canvas");

const inputPath = "/home/ubuntu/upload/pasted_file_Nae9Hz_image.png";
const outputPath =
  "/home/ubuntu/webdev-static-assets/sapiens-doctor-hero-transparent-clean.png";

const img = new Image();
img.src = fs.readFileSync(inputPath);

const scale = 2;
const width = img.width * scale;
const height = img.height * scale;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";
ctx.drawImage(img, 0, 0, width, height);

const imageData = ctx.getImageData(0, 0, width, height);
const data = imageData.data;
const visited = new Uint8Array(width * height);
const queue = new Uint32Array(width * height);
let head = 0;
let tail = 0;

const isNearBlack = idx => {
  const r = data[idx];
  const g = data[idx + 1];
  const b = data[idx + 2];
  return r < 34 && g < 34 && b < 34;
};

const push = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const pos = y * width + x;
  if (visited[pos]) return;
  const idx = pos * 4;
  if (!isNearBlack(idx)) return;
  visited[pos] = 1;
  queue[tail++] = pos;
};

for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(width - 1, y);
}

while (head < tail) {
  const pos = queue[head++];
  const x = pos % width;
  const y = Math.floor(pos / width);
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

for (let pos = 0; pos < visited.length; pos++) {
  if (!visited[pos]) continue;
  const idx = pos * 4;
  data[idx + 3] = 0;
}

ctx.putImageData(imageData, 0, 0);
fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));
console.log(outputPath);
