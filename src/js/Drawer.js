class Drawer {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.canvasCtx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);

    }

    draw(dataArray, analyser, bufferLength){
        analyser.getByteTimeDomainData(dataArray);
        var drawVisual = requestAnimationFrame(() => this.draw(dataArray, analyser, bufferLength));
        this.canvasCtx.clearRect(0, 0, this.width, this.height);
        analyser.getByteTimeDomainData(dataArray);
        this.canvasCtx.lineWidth = 10;
        this.canvasCtx.strokeStyle = 'rgb(100, 100, 100)';
        this.canvasCtx.beginPath();

        let sliceWidth = this.width * 1.0 / bufferLength;
        let x = 0;
        let prevY = this.height;
        for(let i = 0 ; i < bufferLength ; i++){
            let v = dataArray[i] / 128.0;
            let y = v * this.height/2;
           
            if(Math.abs(prevY - y) > 10){
                i === 0 ? this.canvasCtx.moveTo(x, y) : this.canvasCtx.quadraticCurveTo(x, y, x - 0.5, (prevY + y) / 2);
                prevY = y;
            }

            
            x += sliceWidth;
        }
        this.canvasCtx.stroke();
    }

    resizeCanvas(){
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
    }
}


export default Drawer;
