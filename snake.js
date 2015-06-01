(function () {
  "use strict";
  if ( typeof Snake === "undefined") {
      window.Snake = {};
  }
  
  var snake = Snake.snake = function () {
    this.dir = "E";
    this.segments = [[0, 0], [0, 1], [0, 2]];
    this.color = "black";
    
  };
  
  snake.prototype.move = function () {
    var head = this._dup(this.segments[this.segments.length - 1]);
    this.segments.shift();
    if (this.dir === "S") {
      head[0] = head[0] + 1;
      this.segments.push(head);
    } else if (this.dir === "N") {
      head[0] = head[0] - 1;
      this.segments.push(head);
    } else if (this.dir === "E") {
      head[1] = head[1] + 1;
      this.segments.push(head);
    } else {
      head[1] = head[1] - 1;
      this.segments.push(head);
    }
  };
  
  snake.prototype._dup = function (arr) {
    var newArr = [];
    arr.forEach(function(el, i){
      newArr[i] = el;
    });
    return newArr;
  };
  

  
  snake.prototype.turn = function (direction) {
    if (direction === "up") {
      this.dir = "N";
    } else if(direction === "down") {
      this.dir = "S";
    } else if (direction === "right"){
      this.dir = "E";
    }else {
      this.dir = "W";
    }
  };
  
  
  var board = Snake.board = function () {
    this.snake = new Snake.snake();
    this.grid =  this._buildGrid();
    this.apple = [9, 9];
    
  };


  board.prototype.render = function ($el) {
    this.snake.move();
    this._keepSnakeVisible(this.snake.segments[this.snake.segments.length - 1]);
    var that = this;
    this.grid.forEach(function (cell) {
      var ul = "ul:nth-of-type(" + (cell[0] + 1) + ")";
      var li = "li:nth-of-type(" +(cell[1] + 1) + ")";
      var $cell = $el.find(ul + " " + li);
      if (that._include(that.snake.segments, cell)) {
        $cell.css("background", that.snake.color);
      } else if(that._include([that.apple], cell)) {
        $cell.css("background", "red");
      } else {
        $cell.css("background", "transparent");
      }
    });

  };


  board.prototype._include = function (arr, cell) {
    return arr.some(function(arrCell){
      return arrCell[0] === cell[0] && arrCell[1] === cell[1];
    });
  };
  
  board.prototype._keepSnakeVisible = function (head) {
    var that = this;
    var edge = 20;
    head.forEach(function(pos,i){
      if (pos < 0){
        head[i] = 20 ;
      } else if (pos > edge){
        head[i] = 0;
      }
    });
  };
  
  
  board.prototype.turnSnake = function (direction) {
    this.snake.turn(direction);
  };
  
  board.prototype._buildGrid = function () {
    var grid = [];
    var row = 0;
    while (row < 20) {
      var col = 0;
      while (col < 20){
        grid.push([row, col]);
        col++;
      }
      row++;
    }
    
    
    return grid;
  };

  board.prototype.setApple = function () {
    do {
      this.apple[0] = Math.floor(Math.random() * 20);
      this.apple[1] = Math.floor(Math.random() * 20);
    } while (this._include(this.snake.segments, this.apple));
  };


  
  
  
})();