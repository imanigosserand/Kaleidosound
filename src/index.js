const $ = require("jquery");
const colors = ["purple", "fuchsia", "teal", "aqua", "darkcyan", "darkmagenta", "hotpink", "lightpink"];
// var discoMode = false;

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

function setCtxStyle(ctx, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
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
    draw();
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let space = canvas.width / data.length;
    ctx.beginPath();

    // if(discoMode){
    //   colors = colorPicker(2);
    //   gradient = createGradient(ctx, colors[0], colors[1], canvas.width, canvas.height);
    // }

    setCtxStyle(ctx, gradient, "white");
    data.forEach((value,i)=>{
      drawVisuals(ctx, "rect", canvas, i, value, space);
    })
  }
});