(function () {
  "use strict";
  if ( typeof Snake === "undefined") {
      window.Snake = {};
  }
  
  var snake = Snake.snake = function () {
    this.dir = "E";
    this.segments = [[0, 0], [0, 1]];
    
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
    this.grid =  [ [[0, 0],  [0, 1], [0, 2]],
                   [[1, 0],  [1, 1], [1, 2]],               
                   [[2, 0],  [2, 1], [2, 2]] ];
    
  };


  board.prototype.render = function () {
    this.snake.move();
    this._keepSnakeVisible(this.snake.segments[this.snake.segments.length - 1]);
    var rowString = "";
    var that = this;
    this.grid.forEach(function (row) {
      
      row.forEach(function(cell){
        if (that._include(that.snake.segments, cell)) {
          rowString = rowString + "S";
        } else {
          rowString = rowString + ".";
        }
      });
      rowString = rowString + "<br>";
    });
    return rowString;
  };


  board.prototype._include = function (arr, cell) {
    return arr.some(function(arrCell){
      return arrCell[0] === cell[0] && arrCell[1] === cell[1];
    });
  };
  
  board.prototype._keepSnakeVisible = function (head) {
    var that = this;
    head.forEach(function(pos,i){
      if (pos < 0){
        head[i] = that.grid.length - 1;
      } else if (pos > that.grid.length - 1){
        head[i] = 0;
      }
    });
  };
  
  
  board.prototype.turnSnake = function (direction) {
    this.snake.turn(direction);
  };

  


  
  
  
})();