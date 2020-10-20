var canvasWave = document.getElementById('canvasWave');
var ctx3 = canvasWave.getContext('2d');

canvasWave.width = $("#head").innerWidth();
canvasWave.height = $("#head").innerHeight();

const wave = {
  y: canvasWave.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
}

const strokeColor = {
  h: 200,
  s: 50,
  l: 50
}

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.05
}

let increment = wave.frequency;
function animate() {
  requestAnimationFrame(animate)
  ctx3.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${
    backgroundColor.b
  }, ${backgroundColor.a})`
  ctx3.fillRect(0, 0, canvasWave.width, canvasWave.height)

  ctx3.beginPath()
  ctx3.moveTo(0, canvasWave.height / 2)

  for (let i = 0; i < canvasWave.width; i++) {
    ctx3.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude)
  }

  ctx3.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${
    strokeColor.s
  }%, ${strokeColor.l}%)`
  ctx3.stroke()
  increment += wave.frequency
}

animate()
