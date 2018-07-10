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
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(this.center.x, this.center.y, 5, 0, 2 * Math.PI);
        this.canvasCtx.stroke();
        let sliceWidth = bufferLength / this.circumference;
        let x = 0;
        let prevX = 0;
        let prevY = this.radius
        for(let i = 0 ; i < bufferLength ; i++){
            let v = dataArray[i] / 128.0;
            let y = v + this.radius;
            let xCircle = Math.sin(x) * (this.radius);
            //console.log(xCircle, y);
            if(i === 0){
                this.canvasCtx.moveTo(this.center.x, this.radius);
            }else if(i < bufferLength/4){
                this.canvasCtx.lineTo(this.center.x + xCircle, this.center.y + y);
            }else if(i >= bufferLength/4 && i < (2*bufferLength)/4){
                this.canvasCtx.lineTo(this.center.x + xCircle, this.center.y - y);
            }else if(i >= (2*bufferLength)/4 && i > (3*bufferLength)/4){
                this.canvasCtx.lineTo(xCircle - this.center.x, this.center.y - y);
            }else {
                this.canvasCtx.lineTo(xCircle - this.center.x, this.center.y + y);
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
        this.center = { 'x': this.width/2, 'y': this.height/2 };
        this.radius = this.height < this.width ? this.height/4 : this.width/4;
        this.circumference = 2 * Math.PI * this.radius;
    }
}


export default Drawer;
