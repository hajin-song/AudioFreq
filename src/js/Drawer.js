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

        this.drawCircle(this.center.x, this.center.y, 'rgb(100, 100, 100)')
 
        let sliceWidth = bufferLength / this.circumference;
        let x = 0;
        let prevX = 0;
        let prevY = this.radius
        let xCount = 1;
        console.log(bufferLength/4, bufferLength/2, bufferLength * 3 / 4, 'z');
        for(let i = 0 ; i < bufferLength ; i++){
            let v = dataArray[i] / 128.0;
            let y = v + this.radius;
            //console.log(xCircle, y);
            
            if(i === 0){
                //this.canvasCtx.moveTo(this.center.x, this.radius);
            }else if(i < parseInt(bufferLength/4)){
                let strokeStyle = `rgb(${i}, 100, 100)`;
                this.drawCircle(this.center.x + xCount + sliceWidth, this.center.y - y, strokeStyle);
                //this.canvasCtx.lineTo(this.center.x + xCircle, this.center.y + y);
            }else if(i >= parseInt(bufferLength/4) && i < parseInt((2*bufferLength)/4)){
                let strokeStyle = `rgb(0, 0, ${i + 100})`;
                this.drawCircle(this.center.x + xCount + sliceWidth, this.center.y + y, strokeStyle);
                //this.canvasCtx.lineTo(this.center.x + xCircle, this.center.y - y);
            }else if(i >= parseInt((2*bufferLength)/4) && i < parseInt((3*bufferLength)/4)){
                let strokeStyle = `rgb(0, 255, 0)`;
                this.drawCircle(this.center.x - xCount - sliceWidth, this.center.y + y, strokeStyle);
                //this.canvasCtx.lineTo(xCircle - this.center.x, this.center.y - y);
            }else if(i >= parseInt((3*bufferLength)/4)){
                let strokeStyle = `rgb(${i + 100}, 0, 0)`;
                this.drawCircle(this.center.x - xCount - sliceWidth, this.center.y - y, strokeStyle);
                //this.canvasCtx.lineTo(xCircle - this.center.x, this.center.y + y);
            }else {
                let strokeStyle = `rgb(123, 123, 0)`;
                this.drawCircle(100, 100, strokeStyle);
            }
            if((++xCount > this.radius)){
                xCount = 0;
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
        console.log(this.height, this.width, this.center, this.radius)
    }

    drawCircle(x, y, strokeStyle){
        this.canvasCtx.strokeStyle = strokeStyle;
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
        this.canvasCtx.stroke();
    }
}


export default Drawer;
