function setCircles(){

 return {
  inner:  this.container.clientWidth * 0.3,
  outer:  this.container.clientWidth * 0.5
 };
}

function updateCircles(delta){
 console.log(delta);
 this.innerCircle.style.width = (this.dimension.inner * delta) + "px";
 this.innerCircle.style.height = (this.dimension.inner * delta) + "px";
 this.innerBuffer.style.width = (this.dimension.inner * delta - 20) + "px";
 this.innerBuffer.style.height = (this.dimension.inner * delta - 20) + "px";
 this.outerCircle.style.width = (this.dimension.outer * delta) + "px";
 this.outerCircle.style.height = (this.dimension.outer * delta) + "px";
 this.outerBuffer.style.width = (this.dimension.outer * delta - 20) + "px";
 this.outerBuffer.style.height = (this.dimension.outer * delta - 20) + "px";
}

class Drawer {
 constructor(innerCircleID, innerBufferID, outerCircleID, outerBufferID, containerID) {
  this.container = document.getElementById(containerID);
  this.innerCircle = document.getElementById(innerCircleID);
  this.outerCircle = document.getElementById(outerCircleID);
  this.innerBuffer = document.getElementById(innerBufferID);
  this.outerBuffer = document.getElementById(outerBufferID);
 }

 initialise(){
  this.dimension = setCircles.call(this);
  window.addEventListener('resize', () => {
   this.dimension = setCircles.call(this);
  });
 }

 update(delta){
  updateCircles.call(this, delta);

 }
}


export default Drawer;
