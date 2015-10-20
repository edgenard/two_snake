/* globals  key:false */

(function () {
  "use strict";
  if ( typeof Snake === "undefined") {
      window.Snake = {};
  }

//*** Snake.Snake starts here

var SHORTCUTS =  {
  "up"    : "up",
  "w"     : "up",
  "down"  : "down",
  "s"     : "down",
  "right" : "right",
  "d"     : "right",
  "left"  : "left",
  "a"     : "left"
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

  snake.prototype.position = function () {
    return this._body.position();
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
    this._body.move();

  };


  snake.prototype.turn = function (event, handler){
    var direction = SHORTCUTS[handler.shortcut];

    this._body.turn(direction);

  };

  snake.prototype.grow = function () {
    this._body.grow();
  };


  snake.prototype.headDup = function () {
    return this._body.headDup();
  };


  //Utility function, may need to be moved


  function formatShortcuts(shortcuts) {
    return shortcuts.join(", ");
  }

})();
