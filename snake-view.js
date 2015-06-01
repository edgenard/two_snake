(function (){
  if (typeof Snake === "undefined") {
    window.Snake = {};
  }
  
  var view = Snake.view = function($el) {
    this.$el = $el;
    this.board = new Snake.board();
    this.$el.focus();
    this.$el.on("keydown", this.handleKeyDown.bind(this));
    setInterval(this.step.bind(this), 300);
    setInterval(this.board.setApple.bind(this.board), 4000);
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

    this.$el.html(this.board.render(this.$el));
  };
  
  

  
  
})();