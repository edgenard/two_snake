(function (){
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }
  
  var view = Snake.view = function($el) {
    this.$el = $el;
    this.board = new Snake.board();
    this.$el.focus();
    this.$el.on("keydown", this.handleKeyDown.bind(this));

    this.keepPlaying = setInterval(this.step.bind(this), 200);

    this.appleMove = setInterval(this.board.setApple.bind(this.board), 6000);
    this.keyCodes = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
  };

  
  view.prototype.handleKeyDown = function (event) {
    var direction = this.keyCodes[event.keyCode];
    this.board.turnSnake(direction);
  };
  
  view.prototype.step = function () {
    $(".snake-score-1 h3").html(this.board.snake.score);
    this.$el.html(this.board.render(this.$el));
    !this.board.keepRendering && this.stopPlaying();
    
  };
  
  view.prototype.stopPlaying = function () {
    clearInterval(this.keepPlaying);
    clearInterval(this.appleMove);
    this.$el.find(".end-screen").css("display", "block");
    
  };
  
  

  
  
})();