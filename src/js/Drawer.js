class Drawer {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.canvasCtx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);

    }

    draw(dataArray, analyser, bufferLength, context){
        analyser.getByteTimeDomainData(dataArray);
        requestAnimationFrame(() => this.draw(dataArray, analyser, bufferLength, context));
        this.canvasCtx.clearRect(0, 0, this.width, this.height);
        analyser.getByteTimeDomainData(dataArray);
        this.canvasCtx.lineWidth = 10;

        this.drawCircle(this.center.x, this.center.y, 'rgb(100, 100, 100)')
 
        const sliceWidth = this.radius/((bufferLength+1)/4);
        let xCount = this.radius;
        let prevOffset = 0;
        let time = context.currentTime;
        for(let i = 0 ; i < bufferLength ; i++){
            let target = (i + time * 100) % bufferLength;
            let curAngle = (target / (bufferLength/2)) * Math.PI;
            let offSet = dataArray[i];
            if(Math.abs(prevOffset - offSet) < 0.3){
                prevOffset = offSet;
            }
            let direction = this.__calculateOffsetDirection(i, bufferLength);
            let coord = this.__calculateXY(curAngle, direction, prevOffset);
        
            let {x, y} = coord;
            let strokeStyle = `rgb(${i}, 100, 100)`;
            this.drawCircle(x, y, strokeStyle);
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

    drawCircle(x, y, strokeStyle){
        this.canvasCtx.strokeStyle = strokeStyle;
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
        this.canvasCtx.stroke();
    }

    __calculateXY(angle, direction, offset){
        let result = { 
            x: this.radius * Math.cos(angle) + this.width/2 + offset/2,
            y: this.radius * Math.sin(angle) + this.width/2 + offset/2
        };
        return result;
    }

    __calculateOffsetDirection(i, bufferLength){
        if(i < parseInt(bufferLength/4)){
            return { x: 1, y : 1};
        }else if(i >= parseInt(bufferLength/4) && i < parseInt((2*bufferLength)/4)){
            return { x: 1, y: -1};
        }else if(i >= parseInt((2*bufferLength)/4) && i < parseInt((3*bufferLength)/4)){
            return { x: -1, y: -1};
        }else {
            return { x: -1, y: 1};
        }
    }
}


export default Drawer;
