// import {$} from 'jquery';
const $ = require("jquery");

// function init(){
//   let audioContext = new AudioContext();
//   let canvas = document.getElementById('visualizer');
//   return [audioContext, canvas];
// }
//
function verifyAudioFile(fileName){
  let fileSplit = fileName.split(".");
  let type = fileSplit[fileSplit.length - 1]
  return type === 'mp3';
}
//
// function setUpAudioNodes(audioContext) {
//   let analyserNode = audioContext.createAnalyser();
//   let audio = document.getElementById("audio");
//   let sourceNode = audioContext.createMediaElementSource(audio);
//   sourceNode.connect(analyserNode);
//   analyserNode.connect(audioContext.destination);
//   analyserNode.fftSize = 256;
//
//   return [sourceNode, analyserNode, audio];
// }
//
// get coordinates for canvas drawing
function getSquareParams(upperLeftX, upperLeftY, size) {
  if(upperLeftX < 0 || upperLeftY < 0 || size <= 0) return null;

  return [upperLeftX, upperLeftY, upperLeftX + size, upperLeftY + size];
}

module.exports = {
  verifyAudioFile,
  getSquareParams,
};
function fitToContainer(canvas){
  canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function handleFiles(event) {
  var files = event.target.files;
  $("#src").attr("src", URL.createObjectURL(files[0]));
  document.getElementById("audio").load();
}


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
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "purple");
    gradient.addColorStop(1,"magenta");

    ctx.fillStyle = gradient;

    data.forEach((value,i)=>{
      ctx.strokeStyle = 'white';
      ctx.rect(space*i, canvas.height-2*value-5, Math.ceil(space), canvas.height)
      ctx.fillRect(space*i, canvas.height-2*value-5, Math.ceil(space), canvas.height)
      ctx.stroke();

    })
  }

});
// var Color = require('./color').Color;
// $(document).ready(function() {
//
//   let canvas = document.getElementById('visualizer');
//   let ctx = canvas.getContext("2d");
//   fitToContainer(canvas);
//
//   // var Green = Color("#00FF00");
//
//   var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
//   gradient.addColorStop(0, "magenta");
//   gradient.addColorStop(1,"blue");
//
//
//   console.log(canvas.width)
//   console.log(canvas.height)
//   console.log(canvas.width/128)
//   let space = Math.ceil(canvas.width/128)
//   ctx.fillStyle = gradient;
//   ctx.lineWidth = 5;
//   ctx.fillRect(0,0,canvas.width, canvas.height)
// });
