const $ = require("jquery");

function verifyAudioFile(fileName){
  let fileSplit = fileName.split(".");
  let type = fileSplit[fileSplit.length - 1]
  return type === 'mp3';
}

function getSquareParams(upperLeftX, upperLeftY, size) {
  if(upperLeftX < 0 || upperLeftY < 0 || size <= 0) return null;

  return [upperLeftX, upperLeftY, upperLeftX + size, upperLeftY + size];
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

module.exports = {
  verifyAudioFile,
  getSquareParams,
  fitToContainer,
  createGradient,
  setCtxStyle
};

$(document).ready(function() {
  // canvas set up
  let canvas = document.getElementById('visualizer');
  let ctx = canvas.getContext("2d");
  fitToContainer(canvas);

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
    var gradient = createGradient(ctx, "blue", null, canvas.width, canvas.height)

    setCtxStyle(ctx, gradient, "white");

    data.forEach((value,i)=>{
      ctx.rect(space*i, canvas.height-2*value-5, Math.ceil(space), canvas.height)
      ctx.fillRect(space*i, canvas.height-2*value-5, Math.ceil(space), canvas.height)
      ctx.stroke();
    })
  }
});