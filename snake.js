(function () {
  "use strict";
  // if (if typeof Snake === "undefined") {
  //     Snake = {}
  // }
  
  function Snake() {
    this.dir = "S";
    this.segments = [[0, 0]];
    
  }
  
  Snake.prototype.move = function () {
    if (this.dir === "S") {
      this.segments.forEach(this._goSouth, this);
      
    } else if (this.dir === "N") {
      this.segments.forEach(this._goNorth, this);
    } else if (this.dir === "E") {
      this.segments.forEach(this._goEast, this);
    } else {
      this.segments.forEach(this._goWest,this);
    }
  };
  
  
  Snake.prototype._goSouth = function (segment) {
    segment[0] = segment[0] + 1;
  };
  
  Snake.prototype._goNorth = function (segment) {
    segment[0] = segment[0] - 1;
  };
  
  Snake.prototype._goEast = function (segment) {
    segment[1] = segment[1] + 1;
  };
  
  Snake.prototype._goEast = function (segment) {
    segment[1] = segment[1] - 1;
  };
  
  Snake.prototype.turn = function (direction) {
    if (direction === "Up") {
      this.dir = "N";
    } else if(direction === "Down") {
      this.dir = "S";
    } else if (direction === "Right"){
      this.dir = "E";
    }else {
      this.dir = "W";
    }
  };
  
  
  function Board() {
    this.snake = new Snake();
    this.grid =  [ [[0, 0],  [0, 1], [0, 2]],
                   [[1, 0],  [1, 1], [1, 2]],               
                   [[2, 0],  [2, 1], [2, 2]] ];
    
  }


  Board.prototype.render = function () {
    this.grid.forEach(this._printRow, this);
  };
  
  
  Board.prototype._printRow = function (row) {
    var rowString = "";
    var that = this;
    row.forEach(function(cell){
      
      if (that._include(that.snake.segments, cell)) {
        rowString = rowString + "S";
      } else {
        rowString = rowString + ".";
      }
    });
    
    console.log(rowString);
  };


  Board.prototype._include = function (arr, cell) {
    return arr.some(function(arrCell){
      return arrCell[0] === cell[0] && arrCell[1] === cell[1];
    });
  };

  


  
  
  
})();