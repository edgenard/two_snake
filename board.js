(function(){
  "use strict";
  if ( typeof Snake === "undefined") {
      window.Snake = {};
  }


  var board = Snake.board = function (players) {
    this.players = players;
    if (this.players > 1) {  
      this.snake2 = new Snake.snake({color: "green", 
        shortcuts:["w", "a", "s", "d"], 
        startingPos: [[19,0], [19,1]]
      });
    }
    this.snake1 = new Snake.snake(
      {color: "black", 
        shortcuts:["up", "down", "left", "right"], 
        startingPos: [[0,0], [0,1]]
      });
    
    this.grid =  this._buildGrid();
    this.apple = [9, 9];
    this.keepRendering = true;
    
  };


  board.prototype.render = function ($el) {
    if (this.checkSnakes()) {
      this.moveSnakes();
      this.growSnakes();
      this.keepSnakesVisible();
    }

    
    var that = this;
    this.grid.forEach(function (cell) {
      var ul = "ul:nth-of-type(" + (cell[0] + 1) + ")";
      var li = "li:nth-of-type(" +(cell[1] + 1) + ")";
      var $cell = $el.find(ul + " " + li);
      if (that._include(that.snake1.segments, cell)) {
        $cell.css("background", that.snake1.color);
      } else if(that.players > 1 && that._include(that.snake2.segments, cell)) {
        $cell.css("background", that.snake2.color);
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

  board.prototype.keepSnakesVisible = function () {
    var heads = this._getSnakeHeads();
    var edge = 19;
    heads.forEach(function(head){
      head.forEach(function (pos, i) {
        if (pos < 0){
          head[i] = 19 ;
        } else if (pos > edge){
          head[i] = 0;
        }
      });
    });
  };

  board.prototype._getSnakeHeads = function () {
    var heads = [];
    if (this.players > 1) {
      var head2 = this.snake2.segments[this.snake2.segments.length - 1];
      heads.push(head2);
    }
    var head1 = this.snake1.segments[this.snake1.segments.length - 1];
    heads.push(head1);
    return heads;
  };


  board.prototype.turnSnakes = function (direction) {
    this.snake1.turn(direction);
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
    if (this.players > 1) {
      do {
        this.apple[0] = Math.floor(Math.random() * 20);
        this.apple[1] = Math.floor(Math.random() * 20);
      } while (this._include(this.snake2.segments, this.apple) || this._include(this.snake1.segments, this.apple) );
    } else {
      do {
        this.apple[0] = Math.floor(Math.random() * 20);
        this.apple[1] = Math.floor(Math.random() * 20);
      } while (this._include(this.snake1.segments, this.apple));
    }

  };

  board.prototype.growSnakes = function () {
    if (this.players > 1) {
      var head2 = this.snake2.segments[this.snake2.segments.length - 1];
      if (this._include([head2], this.apple )) {
        this.apple = [21, 21];
        this.snake2.addSegment();
        this.snake2.score += 10;
      }
    }
    var head1 = this.snake1.segments[this.snake1.segments.length - 1];
    if (this._include([head1], this.apple )) {
      this.apple = [21, 21];
      this.snake1.addSegment();
      this.snake1.score += 10;
    }
    
  };

  board.prototype.checkSnakes = function () {
    var head1 = this.snake1.head();
    var snakeSansHead1 = this.snake1.segments.slice(0, this.snake1.segments.length - 2);
  
    if (this.players > 1) {
      var head2 = this.snake2.head();
      var snakeSansHead2 = this.snake2.segments.slice(0, this.snake2.segments.length - 2);
      if (this._include(snakeSansHead1, head1) || this._include(snakeSansHead2, head2)  ) {//snakes eat themselves.
          this.keepRendering = false;
          return false;
      } else if (this._include(this.snake1.segments, head2)) {//snake2 eats snake1
        this.snake2.score = Math.floor(this.snake2.score / 3);
        this.keepRendering = false;
        return false;
        
      } else if (this._include(this.snake2.segments, head1)){//snake1 eats snake2
        this.snake1.score = Math.floor(this.snake1.score / 3);
        
        this.keepRendering = false;
        return false;
        
      }
      
    } else {
      if (this._include(snakeSansHead1, head1)) {//snake eating itself
        this.keepRendering = false;
        return false;
      }
    }
    return true;
    
  };

  board.prototype.moveSnakes = function () {
    if(this.players > 1){
      this.snake2.move();
    }
    this.snake1.move();
  };
  
  
  board.prototype.highScore = function () {
    var score2, score1, highScore;
    if (this.players > 1) {
      score2 = this.snake2.score; 
    }
    score1 = this.snake1.score;
    if (score2) {
      highScore = score1 > score2 ? score1 : score2;
    } else{
      highScore = score1;
    }
    return highScore;
  };
  
  
  board.prototype.winner = function () {
    var winner;
    if (this.players > 1) {
      winner = this.snake1.score > this.snake2.score ?  "Black Snake" : "Green Snake";
    } else {
      return;
    }
    return winner;
  };

})();
