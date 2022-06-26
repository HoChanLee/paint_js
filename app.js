const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const reset = document.getElementById('jsreset');

canvas.width = 700;
canvas.height = 700;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "#2c2c2c";
let painting = false;
let filling = false;
function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

const onClick = () => {
  if(filling === true){
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

const onCM = (e) => {
  e.preventDefault();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

const handleSizeChange = (e) => {
    const size = e.target.value;
    ctx.lineWidth = size;
}

const handleChangMode = (e) => {
  if(filling === true){
    mode.innerText = 'fill';
    filling = false;
    painting = true;
  } else {
    mode.innerText = 'paint';
    filling = true;
    painting = false;
  }
}

const handleSave = (e) => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS'
  link.click();
}

const handleReset = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", onClick);
  canvas.addEventListener("contextmenu", onCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

range.addEventListener("input", handleSizeChange);

mode.addEventListener('click', handleChangMode);

save.addEventListener('click', handleSave);

reset.addEventListener('click', handleReset);