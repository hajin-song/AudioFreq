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
  draw();
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

function draw() {
 var bufferLength = analyser.frequencyBinCount;
 var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  //console.log(bufferLength, dataArray);
  drawVisual = requestAnimationFrame(draw);
  //console.log('begin');
  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 1;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  canvasCtx.beginPath();

  var sliceWidth = canvas.width * 5.0 / bufferLength;
  var x = 0;
  //console.log(sliceWidth, bufferLength, dataArray.length);
  for (var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 128.0;

    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
};

loadSound('assets/audio/ausAnthem.mp3');
