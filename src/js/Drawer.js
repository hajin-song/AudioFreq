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
 
        const sliceWidth = this.radius/((bufferLength+1)/4);
        let xCount = this.radius;

        for(let i = 0 ; i < bufferLength ; i++){
            let v = dataArray[i] / 128.0;
            let y = v + this.radius;
            //console.log(xCircle, y);
            
            if(i === 0){
                //this.canvasCtx.moveTo(this.center.x, this.radius);
            }else if(i < parseInt(bufferLength/4)){
                let strokeStyle = `rgb(${i}, 100, 100)`;
                this.drawCircle(this.center.x + xCount, this.center.y - y + xCount, strokeStyle);
                //this.canvasCtx.lineTo(this.center.x + xCircle, this.center.y + y);
            }else if(i >= parseInt(bufferLength/4) && i < parseInt((2*bufferLength)/4)){
                let strokeStyle = `rgb(0, 0, ${i + 100})`;
                this.drawCircle(this.center.x + xCount, this.center.y + y - xCount, strokeStyle);
                //this.canvasCtx.lineTo(this.center.x + xCircle, this.center.y - y);
            }else if(i >= parseInt((2*bufferLength)/4) && i < parseInt((3*bufferLength)/4)){
                let strokeStyle = `rgb(0, 255, 0)`;
                this.drawCircle(this.center.x - xCount, this.center.y + y - xCount, strokeStyle);
                //this.canvasCtx.lineTo(xCircle - this.center.x, this.center.y - y);
            }else if(i >= parseInt((3*bufferLength)/4)){
                let strokeStyle = `rgb(${i + 100}, 0, 0)`;
                this.drawCircle(this.center.x - xCount, this.center.y - y + xCount, strokeStyle);
                //this.canvasCtx.lineTo(xCircle - this.center.x, this.center.y + y);
            }else {
                let strokeStyle = `rgb(123, 123, 0)`;
                this.drawCircle(100, 100, strokeStyle);
            }
            xCount-= sliceWidth;
            if(i===parseInt(bufferLength/4) || 
                i===parseInt(bufferLength/2) || 
                i === parseInt(3*bufferLength/4)){
                xCount = this.radius;
            }
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
