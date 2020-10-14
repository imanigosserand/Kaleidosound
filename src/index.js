function init(){
  let audioContext = new AudioContext();
  let canvas = document.getElementById('visualizer');
  return [audioContext, canvas];
}

function verifyAudioFile(fileName){
  let fileSplit = fileName.split(".");
  let type = fileSplit[fileSplit.length - 1]
  return type === 'mp3';
}

function setUpAudioNodes(audioContext) {
  let analyserNode = audioContext.createAnalyser();
  let audio = document.getElementById("audio");
  let sourceNode = audioContext.createMediaElementSource(audio);
  sourceNode.connect(analyserNode);
  analyserNode.connect(audioContext.destination);
  analyserNode.fftSize = 256;

  return [sourceNode, analyserNode, audio];
}

// get coordinates for canvas drawing
function getSquareParams(upperLeftX, upperLeftY, size) {
  if(upperLeftX < 0 || upperLeftY < 0 || size <= 0) return null;

  return [upperLeftX, upperLeftY, upperLeftX + size, upperLeftY + size];
}

module.exports = {
  verifyAudioFile,
  getSquareParams,
};
