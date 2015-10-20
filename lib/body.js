(function() {
  'use strict';
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }


  var body = Snake.Body = function (options) {
    this._segments = options.segments;
    this._color = options.color;
    this._dir = options.dir;
  };

  body.prototype.position = function () {
    return this._segments;
  };

  body.prototype.getColor = function () {
    return this._color;
  };

  body.prototype.getDir = function () {
    return this._dir;
  };

  body.prototype.grow = function () {
    this._addSegment();
  };

  body.prototype._addSegment = function () {
    var newHead = this._getNewHead();
    this._segments.push(newHead);
  };

  body.prototype._getNewHead = function () {
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

  body.prototype.headDup = function () {
    return dup(this._segments[this._segments.length - 1]);
  };

  body.prototype.move = function () {
    this._removeTail();
    this._addSegment();
  };

  body.prototype._removeTail = function () {
    this._segments.shift();
  };


  body.prototype.turn = function (direction) {
    if(!this._validDirection(direction)) return;

    if (direction === "up"){
      this._dir = "N";
    }else if( direction === "down"){
      this._dir = "S";
    }else if(direction === "right"){
      this._dir = "E";
    } else {
      this._dir = "W";
    }

  };

  body.prototype._validDirection = function (direction) {

    if (this._dir === "S" && direction === "up" ){
      return false;
    }

    if (this._dir === "N" && direction === "down" ){
      return false;
    }

    if (this._dir === "W" && direction === "right" ){
      return false;
    }

    if (this._dir === "E" && direction === "left") {
      return false;
    }

    return true;
  };


  function dup(arr) {
    var newArr = [];
    arr.forEach(function(el, i){
      newArr[i] = el;
    });
    return newArr;
  }


}());
