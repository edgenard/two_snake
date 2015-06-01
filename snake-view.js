(function (){
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }
  
  var view = Snake.view = function($el) {
    this.$el = $el;
    this.board = new Snake.board();
    $el.on("keydown", this.handleKeyDown).bind(this);
    setInterval(this.step.bind(this), 500);
  };
  
  view.prototype.handleKeyDown = function (event) {
    this.board.turnSnake(event.hotkey);
  };
  
  view.prototype.step = function () {
    console.log(this.board.render());
    this.$el.html(this.board.render());
  };
  
  

  
  
})();