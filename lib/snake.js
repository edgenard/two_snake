(function () {
  "use strict";
  if ( typeof Snake === "undefined") {
      window.Snake = {};
  }

  var snake = Snake.Snake = function (options) {
    this._dir = "E";
    this._segments = options.startingPos;
    this._color = options.color;
    this._score = 0;
    key(formatShortcuts(options.shortcuts), this.turn.bind(this));

  };

  snake.prototype.getColor = function () {
    return this._color;
  };

  snake.prototype.setColor = function (newColor) {
    this._color = newColor;
  };

  snake.prototype.getDir = function () {
    return this._dir;
  };

  snake.prototype.setDir = function (newDir) {
    this._dir = newDir;
  };

  snake.prototype.position = function () {
    return this._segments;
  };

  snake.prototype.setSegments = function (newSegments) {
    this._segments = newSegments;
  };

  snake.prototype.getScore = function () {
    return this._score;
  };

  snake.prototype.setScore = function (newScore) {
    this._score += newScore;
  };

  snake.prototype.zeroScore = function () {
    this._score = 0;
  };

  snake.prototype.move = function () {
    this._segments.shift();
    this.addSegment();

  };

  snake.prototype.turn = function (event, handler){
    var direction = handler.shortcut;

    if(!this.validDirection(direction)) return;

    if (direction === "up" || direction === "w"){
      this._dir = "N";
    }else if( direction === "down" || direction === "s"){
      this._dir = "S";
    }else if(direction === "right" || direction === "d"){
      this._dir = "E";
    } else {
      this._dir = "W";
    }
  };

  snake.prototype.validDirection = function(direction) {

    if (this._dir === "S" && (direction === "up" || direction === "w")){
      return false;
    }

    if (this._dir === "N" && (direction === "down" || direction === "s")){
      return false;
    }

    if (this._dir === "W" && (direction === "right" || direction === "d")){
      return false;
    }

    return !(this._dir === "E" && (direction === "left" || direction === "a"));



  };

  snake.prototype.addSegment = function () {
    var newHead = this.getNewHead();
    this._segments.push(newHead);
  };

  snake.prototype.getNewHead = function() {
    var newHead = this.headDup();
    if (this._dir === "S") {
      newHead[0] = newHead[0] + 1;

    } else if (this._dir === "N") {
      newHead[0] = newHead[0] - 1;

    } else if (this._dir === "E") {
      newHead[1] = newHead[1] + 1;

    } else {
      newHead[1] = newHead[1] - 1;

    }
    return  newHead;
  };

  snake.prototype.headDup = function () {
    return dup(this._segments[this._segments.length - 1]);
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
