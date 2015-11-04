(function () {
  "use strict";
  if ( typeof Snake === "undefined") {
      window.Snake = {};
  }
  var body = Snake.Body = function (options) {
    this._segments = options.segments;
    this._color = options.color;
    this._dir = options.dir;
  };


  body.prototype.getColor = function () {
    return this._color;
  };

  body.prototype.position = function () {
    return this._segments;
  };

  body.prototype.getDir = function () {
    return this._dir;
  };

  body.prototype.removeTail = function () {
    this._segments.shift();
  };

  body.prototype.grow = function () {
    this._addSegment();
  };

  body.prototype._addSegment =function () {
    var newHead = this._getNewHead();
    this._segments.push(newHead);
  };

  body.prototype._getNewHead = function () {
    var newHead = this._headDup();
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

  body.prototype._headDup = function () {
    return dup(this._segments[this._segments.length - 1]);
  };








  var snake = Snake.Snake = function (options) {
    this._body = new Snake.Body({
      segments: options.startingPos,
      color: options.color,
      dir: "E"
    });


    this._score = 0;
    key(formatShortcuts(options.shortcuts), this.turn.bind(this));

  };

  snake.prototype.getColor = function () {
    return this._body.getColor();
  };

  snake.prototype.setColor = function (newColor) {
    this._color = newColor;
  };

  snake.prototype.getDir = function () {
    return this._body.getDir();
  };

  snake.prototype.setDir = function (newDir) {
    this._dir = newDir;
  };



  snake.prototype.position = function () {
    return this._body.position();
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
    this._body.removeTail();
    this.grow();

  };

  snake.prototype.grow = function () {
    this._body.grow();
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

    if (this._dir === "E" && (direction === "left" || direction === "a")){
      return false;
    }

    return true;

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
