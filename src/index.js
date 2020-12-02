const $ = require("jquery");
const colors = ["purple", "fuchsia", "teal", "aqua", "darkcyan", "darkmagenta", "hotpink", "lightpink"];
var discoMode = false;
var drawingMode = "line";

function verifyAudioFile(fileName){
  let fileSplit = fileName.split(".");
  let type = fileSplit[fileSplit.length - 1]
  return type === 'mp3';
}

function fitToContainer(canvas){
  canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  return canvas
}

function handleFiles(event) {
  var files = event.target.files;
  $("#src").attr("src", URL.createObjectURL(files[0]));
  document.getElementById("audio").load();
}

function createGradient(ctx, color1, color2, width, height) {
  var gradient = ctx.createLinearGradient(0, 0, width || 0, height || 0);
  gradient.addColorStop(0, color1 || "white");
  gradient.addColorStop(1,color2 || "white");
  return gradient;
}

function setCtxStyle(ctx, fill, stroke, lineWidth) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth || 1;
  return ctx;
}

function colorPicker(numOfColors) {
  let colorArray = [];
  for(let i = 0; i < numOfColors; i++){
    colorArray.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  return colorArray;
}

function drawVisuals(ctx, mode, canvas, x, y, shapeSize) {
  if(mode === "rect") {
    let startX = shapeSize*x;
    let startY = canvas.height-2*y-5;
    let width = Math.ceil(shapeSize);
    let height = canvas.height;
    ctx.rect(startX, startY, width, height)
    ctx.fillRect(startX, startY, width, height)
    ctx.stroke();
    return [startX, startY, width, height];
  }
  return null
}

function drawLineVisuals(ctx, canvas, offset, x, y, lineWidth){
  ctx.moveTo(x * (lineWidth * 2) + offset, canvas.height / 2 - (y/2)**1.2)
  ctx.lineTo(x * (lineWidth * 2) + offset, canvas.height / 2 + (y/2)**1.2)
  ctx.stroke()
}

module.exports = {
  colors,
  verifyAudioFile,
  fitToContainer,
  createGradient,
  setCtxStyle,
  colorPicker,
  drawVisuals
};

$(document).ready(function() {
  // canvas set up
  let canvas = document.getElementById('visualizer');
  let ctx = canvas.getContext("2d");

  fitToContainer(canvas);

  let lineColor = colorPicker(1);
  let colors = colorPicker(2);
  let gradient = createGradient(ctx, colors[0], colors[1], canvas.width, canvas.height);
  setCtxStyle(ctx, gradient, "white");

  // audio set up
  document.getElementById("upload").addEventListener("change", handleFiles, false);

  let audioElement = document.getElementById("audio")
  let audioContext = new AudioContext();
  let analyserNode = audioContext.createAnalyser();
  let sourceNode = audioContext.createMediaElementSource(audioElement);
  sourceNode.connect(analyserNode);
  sourceNode.connect(audioContext.destination);
  analyserNode.fftSize = 256;

  let data = new Uint8Array(analyserNode.frequencyBinCount);
  audioElement.onplay = ()=>{
    audioContext.resume();
  }

  loopingFunction(data, analyserNode, ctx, canvas)

  function loopingFunction(){
    requestAnimationFrame(loopingFunction);
    analyserNode.getByteFrequencyData(data);

    switch (drawingMode) {
      case "line":
        lineDraw();
        break;

      default:
        draw();
    }
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length;
    ctx.beginPath();

    if(discoMode){
      colors = colorPicker(2);
      gradient = createGradient(ctx, colors[0], colors[1], canvas.width, canvas.height);
    }

    setCtxStyle(ctx, gradient, "white");
    data.forEach((value,i)=>{
      drawVisuals(ctx, "rect", canvas, i, value, space);
    })
  }

  function lineDraw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let lineWidth = Math.floor(canvas.width / data.length / 2) ;
    // let lineWidth = 1
    ctx.beginPath();
    if(discoMode){
      lineColor = colorPicker(1);
    }
    setCtxStyle(ctx, "white", lineColor, lineWidth);

    let offset = (canvas.width - data.length * (lineWidth * 2)) / 2;

    data.forEach((value,i)=>{
      drawLineVisuals(ctx, canvas, offset, i, value, lineWidth);
    })
  }
});