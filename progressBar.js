'use strict'
/**
* Circular managable progress bar
* @author Balganym Tulebayeva
* @namespace Progress
* @desc To add the progress bar block into your application:
* <ul>
*   <li>include progress.css</li>
*   <li>include progressBar.js</li>
*   <li>create a div element with some id</li>
*</ul>
*  Parameters in Progress' constructor are:
*  <li>{string} id of you div element - myProgress</li>
*  <li>{object} properties of your progress bar</li>
*  <li> - size: big/normal/small</li>
*  <li> - centered: yes/no</li>
*  <li> - value: initial value of your bar</li>
*  <li> - animated: yes/no </li>
*  <li> - time: 2 (animation speed) </li>
*  <li> - hidden: yes/no </li>
* @example
* <header>
*   <link rel="stylesheet" href="progressBar.css">
* </header> 
* <div id="myProgress"></div>
* <script src="ProgressBar.js"></script>
* <script>
*  var progress = new Progress("myProgress", {
*   size: "big",
*   centered: "yes",
*   value: 43,
*   animated: "no"
*  });
*</script>
*/
var Progress = function(id, props){

  // building our progress bar
  this.props = props;
  this.prevValue = 0;
  this.half = false;
  this.block = document.getElementById(id);
  this.circle = document.createElement('div');
  this.slice = document.createElement('div');
  this.bar = document.createElement('div');
  this.progress = document.createElement('div');

  // it is just for realization of my logic of filling the bar
  this.transform = function(deg){
    this.bar.style.webkitTransform = deg;
    this.bar.style.mozTransform = deg;
    this.bar.style.msTransform = deg;
    this.bar.style.oTransform = deg;
    this.bar.style.transform = deg;
  }

  // it is just for realization of my logic of filling the bar
  this.fill = function(value, _this){
    this.circle.classList.add("bar2");
    this.progress.classList.add("fill2");
    var deg = 'rotate(' + (value * 3.6) + 'deg)';
    this.slice.style.clip = 'rect(auto, auto, auto, auto)';
    this.transform(deg);
  }

  // it is just for realization of my logic of filling the bar
  this.unfill = function(value){
    var deg = 'rotate(' + (value * 3.6) + 'deg)';
    this.transform(deg);
    this.bar.classList.remove("bar2");
    this.progress.classList.remove("fill2");
    this.slice.style.clip = '';
  }

  // adding of classes to our progress bar for writing styles
  this.block.classList.add("progress");
  this.circle.classList.add('circle', 'p0');
  this.slice.className = 'slice';
  this.bar.className = "bar"
  this.progress.className = 'fill';

  this.block.insertBefore(this.circle, this.block.childNodes[0]);
  this.circle.appendChild(this.slice);
  this.slice.appendChild(this.bar);
  this.slice.appendChild(this.progress); 

  // managing of our progress bar when its exemplar is created
  if(this.props !== undefined){
    if(this.props.centered  !== undefined && this.props.centered === "yes"){
      this.circle.classList.add("center");
    }
    if(this.props.size !== undefined){
      this.circle.classList.add(this.props.size);
    }
    if(this.props.value !== undefined){
      this.setValue(this.props.value);
    }
    if(this.props.animated !== undefined){
      this.setMod("animated", this.props.animated);
    }
    if(this.props.hidden !== undefined){
      this.setMod("hidden", this.props.animated);
    }
    if(this.props.time === undefined){
      this.props.time = 1;
    }
  }
  this.bar.style.transition = "transform " + this.props.time + "s ease-out";
}

/**
* @function
* @name setValue
* @param {int} value - Set the value of bar
* @desc you can use this method for managing the progress bar
* @example
*
*<div id="bar">
* <input type="text" id="arc"/>
*</div>
*<script>
*  var pr = new Progress("bar", {size: normal});
*  var arc = document.getElementById("arc");
*   arc.value = pr.props.value;
*   arc.onchange = function(e){
*   pr.setValue(e.target.value);
*  }
* </script>
*/
Progress.prototype.setValue = function(value) {
  if(value > 50){
    if(!this.half){
      var deg = 'rotate(' + (50 * 3.6) + 'deg)';
      this.transform(deg);
      this.half = true;
      var _this = this;
      setTimeout(()=>this.fill(value), this.props.time * 1000);
    }else{
      this.bar.classList.add("bar2");
      this.progress.classList.add("fill2");
      var deg = 'rotate(' + (value * 3.6) + 'deg)';
      this.slice.style.clip = 'rect(auto, auto, auto, auto)';
      this.transform(deg);
    }
  }
  else{
    if(value == 50){
      this.half = true;
    }else{
      this.half = false;
    }
    if(this.prevValue > 50){
      var deg = 'rotate(' + (50.1 * 3.6) + 'deg)';
      this.transform(deg);
      setTimeout(()=>this.unfill(value), this.props.time * 1000);
    }else{
      var deg = 'rotate(' + (value * 3.6) + 'deg)';
      this.transform(deg);
    }
  }
  this.prevValue = value;
};

/**
* @function
* @name setMod
* @param {string} key - animated or hidden
* @param {string} state - "yes"/"" (animated/not animated, hidden/visible)
* @desc you can use this method for managing the progress bar
* @example
*<div id="bar">
* <input type="checkbox" id="hide"/>
* <input type="checkbox" id="animate"/>
*</div>
*<script>
*  var pr = new Progress("bar", {size: normal});
*  var hide = document.getElementById("hide");
*  hide.onchange = function(){
*   hide.checked ? pr.setMod("hidden", "yes") : pr.setMod("hidden", "");  
*  }
*  var animate = document.getElementById("animate");
*  animate.onchange = function(){
*   animate.checked ? pr.setMod("animated", "yes") : pr.setMod("animated", "");  
*  }
* </script>
*/
Progress.prototype.setMod = function(key, state){
  if(key === "animated"){
    state === "yes" ? this.slice.classList.add(key) 
    : this.slice.classList.remove(key);
  }
  else if(key === "hidden"){
    state === "yes" ? this.circle.style.display = "none"
      : this.circle.style.display = "flex";
  }
};


