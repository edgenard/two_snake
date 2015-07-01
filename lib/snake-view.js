(function (){
  "use strict";
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }

  var view = Snake.view = function($el, players) {
    this.$el = $el;
    this.board = new Snake.board(players);
    this.$el.focus();


    this.keepPlaying = setInterval(this.step.bind(this), 100);

    this.appleMove = setInterval(this.board.setApple.bind(this.board), 5000);
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
    $(".snake-score-1 h3").empty().html(this.board.snake1.score);
    this.board.snake2 && $(".snake-score-2 h3").empty().html(this.board.snake2.score);
    this.$el.find(".end-screen").css("display", "flex");
    var score = this.board.highScore();
    var winner = this.board.winner();
    $(".end-screen .winner").empty();
    if(winner) $(".end-screen .winner").html("The winner is " + winner);
    $(".end-screen .winning-score").text("The high score is " + score);


  };





})();
