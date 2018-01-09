window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var canvas = document.getElementById('oscilloscope');
var canvasCtx = canvas.getContext('2d');
var analyser = context.createAnalyser();
function playSound(buffer){
 let source = context.createBufferSource();
 context.decodeAudioData(buffer, (audioBuffer) => {
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.connect(analyser);
  analyser.fftSize = 1024;
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
 //console.log(bufferLength, dataArray);
 var centerX = canvas.width / 2;
 var centerY = canvas.height / 2;
 var radius = dataArray.reduce( (acc, cur) => {
  return acc + cur;
 }, 0) / bufferLength * 0.5;

 var diff = (curR - radius)/2;
 var direction = -1;
 if(diff > 0){
  direction = 1;
 }
 var jumpAmount = Math.abs(diff/400 * diff);
 drawVisual = requestAnimationFrame(function(){
  draw(radius);
 });

 canvasCtx.lineWidth = 1;
 canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
 var i = 0;
 while(Math.abs(curR - radius) > 0.0001){
  requestAnimationFrame(function(){
   canvasCtx.fillStyle = 'rgb(200, 200, 200)';
   canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
   radius += direction * jumpAmount;
   var subRadius = radius / 2;

   console.log(centerX, centerY, radius, direction, jumpAmount, subRadius);

   canvasCtx.beginPath();
   canvasCtx.arc(centerX, centerY, radius + (direction * jumpAmount * 5), 0, 2 * Math.PI, false);
   canvasCtx.stroke();
   canvasCtx.beginPath();
   canvasCtx.arc(centerX, centerY, subRadius, 0, 2 * Math.PI, false);
   canvasCtx.stroke();
  });

  if(i>400 * diff){
   break;
  }
  i++;
 }



};

loadSound('assets/audio/ausAnthem.mp3');
