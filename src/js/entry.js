import Drawer from './Drawer';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var drawer = new Drawer('drawer');
var context = new AudioContext();
var analyser = context.createAnalyser();
function playSound(buffer){
 let source = context.createBufferSource();
 context.decodeAudioData(buffer, (audioBuffer) => {
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.connect(analyser);
  analyser.fftSize = 1024;
  source.start(0);
  draw();
 });
}


function loadSound(url){
 fetch(url).then( (res) => {
  return res.blob();
 }).then( (data) => {
  let fileReader = new FileReader();
  fileReader.onloadend = () => {
   playSound(fileReader.result);
  }
  fileReader.readAsArrayBuffer(data);
 });
}

function draw() {
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    drawer.draw(dataArray, analyser, bufferLength, context);



};

loadSound('assets/audio/summer.mp3');
