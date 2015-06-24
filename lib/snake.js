(function () {
  "use strict";
  if ( typeof Snake === "undefined") {
      window.Snake = {};
  }
  
  var snake = Snake.snake = function (options) {
    this.dir = "E";
    this.segments = options.startingPos;
    this.color = options.color;
    this.score = 0;
    this.shortcuts = options.shortcuts.join(", ");
    key(this.shortcuts, this.turn.bind(this));
    
  };
  
  snake.prototype.move = function () {
    this.segments.shift();
    this.addSegment();
    
  };
  
  snake.prototype._dup = function (arr) {
    var newArr = [];
    arr.forEach(function(el, i){
      newArr[i] = el;
    });
    return newArr;
  };
  

  
  snake.prototype.turn = function (event, handler) {
    var direction = handler.shortcut;
    if (direction === "up" || direction === "w") {
      
      if(this.dir !== "S") this.dir = "N";
      
    } else if(direction === "down" || direction === "s") {
      
      if (this.dir !== "N") this.dir = "S";
      
    } else if (direction === "right" || direction === "d"){
      if(this.dir !== "W") this.dir = "E";
    }else {
      if(this.dir !== "E") this.dir = "W";
    }
  };

  
  snake.prototype.addSegment = function () {
    var head = this.head();
    if (this.dir === "S") {
      head[0] = head[0] + 1;
      
    } else if (this.dir === "N") {
      head[0] = head[0] - 1;
      
    } else if (this.dir === "E") {
      head[1] = head[1] + 1;
      
    } else {
      head[1] = head[1] - 1;
      
    }
    this.segments.push(head);
  };
  
  snake.prototype.head = function () {
    return this._dup(this.segments[this.segments.length - 1]);
  };
  

  

  
  
})();