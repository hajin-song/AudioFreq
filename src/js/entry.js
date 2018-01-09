import Drawer from './Drawer';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var drawer = new Drawer('circleInner', 'circleOuter', 'main');
var context = new AudioContext();
var analyser = context.createAnalyser();
function playSound(buffer){
 let source = context.createBufferSource();
 context.decodeAudioData(buffer, (audioBuffer) => {
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.connect(analyser);
  analyser.fftSize = 1024;
  drawer.initialise();
  draw(0);
  source.start(0);

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

function draw(curR) {
 var bufferLength = analyser.frequencyBinCount;
 var dataArray = new Uint8Array(bufferLength);
 analyser.getByteTimeDomainData(dataArray);

 var radius = dataArray.reduce( (acc, cur) => {
  return acc + cur;
 }, 0) / bufferLength;
 requestAnimationFrame(function(){
  draw(radius);
 });
 var delta = (curR - radius);
 if(delta > 1.5){
  delta = 1.5 + ((Math.random() * (0.25 - (-0.25)) + (-0.25)).toFixed(4));
 }else if (Math.abs(delta) < 0.1) {
  delta = ((Math.random() * (0.25 - (-0.25)) + (-0.25)).toFixed(4));
 }
 //console.log(delta);
 drawer.update(delta);



};

loadSound('assets/audio/ausAnthem.mp3');
