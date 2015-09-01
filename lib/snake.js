(function () {
  "use strict";
  if ( typeof Snake === "undefined") {
      window.Snake = {};
  }

  var snake = Snake.Snake = function (options) {
    this.dir = "E";
    this.segments = options.startingPos;
    this.color = options.color;
    this.score = 0;
    key(formatShortcuts(options.shortcuts), this.turn.bind(this));

  };

  snake.prototype.move = function () {
    this.segments.shift();
    this.addSegment();

  };

  snake.prototype.turn = function (event, handler){
    var direction = handler.shortcut;

    if(!this.validDirection(direction)) return;

    if (direction === "up" || direction === "w"){
      this.dir = "N";
    }else if( direction === "down" || direction === "s"){
      this.dir = "S";
    }else if(direction === "right" || direction === "d"){
      this.dir = "E";
    } else {
      this.dir = "W";
    }
  };

  snake.prototype.validDirection = function(direction) {

    if (this.dir === "S" && (direction === "up" || direction === "w")){
      return false;
    }

    if (this.dir === "N" && (direction === "down" || direction === "s")){
      return false;
    }

    if (this.dir === "W" && (direction === "right" || direction === "d")){
      return false;
    }

    if (this.dir === "E" && (direction === "left" || direction === "a")){
      return false;
    }

    return true;

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
        return dup(this.segments[this.segments.length - 1]);
      };


      //Utility function, may need to be moved

  function dup(arr) {
    var newArr = [];
    arr.forEach(function(el, i){
      newArr[i] = el;
    });
    return newArr;
  }

  function formatShortcuts(shortcuts) {
    return shortcuts.join(", ");
  }

})();
