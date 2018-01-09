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
 this.outerCircle.style.width = (this.dimension.outer * delta) + "px";
 this.outerCircle.style.height = (this.dimension.outer * delta) + "px";
}

class Drawer {
 constructor(innerCircleID, outerCircleID, containerID) {
  this.container = document.getElementById(containerID);
  this.innerCircle = document.getElementById(innerCircleID);
  this.outerCircle = document.getElementById(outerCircleID);
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
