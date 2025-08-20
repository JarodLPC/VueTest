export interface MeteorOptions {
  width?: number;
  height?: number;
  rect?: { x: number; y: number; w: number; h: number };
  brightness?: number;
  tailLength?: number;
  meteorRadius?: number;
  tailRadiusStep?: number;
  speed?: number;
  shadowBlur?: number;
}

export function drawMeteor(
  ctx: CanvasRenderingContext2D,
  options: MeteorOptions = {}
) {
  const {
    width = 400,
    height = 300,
    rect = { x: 50, y: 50, w: 300, h: 200 },
    brightness = 1,
    tailLength = 30,
    meteorRadius = 3,
    tailRadiusStep = 0.10,
    speed = 0.005,
    shadowBlur = 8,
  } = options;

  let t = 0;

  function getMeteorPos(t: number) {
    const perim = 2 * (rect.w + rect.h);
    let d = t * perim;
    if (d < rect.w) {
      return { x: rect.x + d, y: rect.y };
    } else if (d < rect.w + rect.h) {
      return { x: rect.x + rect.w, y: rect.y + (d - rect.w) };
    } else if (d < rect.w * 2 + rect.h) {
      return { x: rect.x + rect.w - (d - rect.w - rect.h), y: rect.y + rect.h };
    } else {
      return { x: rect.x, y: rect.y + rect.h - (d - rect.w * 2 - rect.h) };
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

    for (let i = tailLength; i >= 0; i--) {
      const tailT = t - i * speed;
      let tt = tailT;
      if (tt < 0) tt += 1;
      const pos = getMeteorPos(tt);
      const alpha = (i === 0)
        ? brightness
        : 0.05 + 0.95 * (1 - i / tailLength) * brightness;
      const radius = Math.max(0.5, meteorRadius - i * tailRadiusStep); // 保证半径不为负
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = i === 0 ? shadowBlur : 0;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    t += speed;
    if (t > 1) t = 0;
    requestAnimationFrame(draw);
  }

  draw();
}