(function (){
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }
  
  var view = Snake.view = function($el, players) {
    this.$el = $el;
    this.board = new Snake.board(players);
    this.$el.focus();


    this.keepPlaying = setInterval(this.step.bind(this), 100);

    this.appleMove = setInterval(this.board.setApple.bind(this.board), 5000);
    this.keyCodes = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
  };

  
  
  view.prototype.step = function () {
    $(".snake-score-1 h3").html(this.board.snake1.score);
    this.board.snake2 && $(".snake-score-2 h3").html(this.board.snake2.score);
    this.$el.html(this.board.render(this.$el));
    !this.board.keepRendering && this.stopPlaying();
    
  };
  
  view.prototype.stopPlaying = function () {
    clearInterval(this.keepPlaying);
    clearInterval(this.appleMove);
    this.$el.find(".end-screen").css("display", "block");
    var score = this.board.highScore();
    $(".end-screen .winning-score").text("The high score is " + score);
    
    
  };
  
  

  
  
})();