describe("Snake", function () {
  beforeEach(function () {
    this.snake = new Snake.snake({color: "black", 
                                 startingPos: [[0,0], [0,1]],
                                 shortcuts: ["up", "down", "left", "right" ]});
  });

  it("starts off with the given options ", function () {
    expect(this.snake.segments).toEqual([[0,0], [0, 1]]);
    expect(this.snake.color).toBe("black");
    expect(this.snake.shortcuts).toEqual("up, down, left, right");
    expect(this.snake.dir).toEqual("E");
    expect(this.snake.score).toEqual(0);
  });
  
  it("moves East",function(){
    this.snake.move();
    expect(this.snake.segments).toEqual([[0, 1],[0,2]]);
    
  });
  
  it("moves South", function () {
    this.snake.dir = "S";
    this.snake.move();
    expect(this.snake.segments).toEqual([[0, 1], [1,1]]);
  });
  
  
  it("moves North", function () {
    this.snake.dir = "N";
    this.snake.move();
    expect(this.snake.segments).toEqual([[0,1], [-1,1]]);
  });
  
  it("moves West", function() {
    this.snake.dir = "W";
    this.snake.move();
    expect(this.snake.segments).toEqual([[0,1], [0,0]]);
  });
  
  describe("turning", function () {
    var handler = {};
    
    it("turns South when down is pressed", function () {
      handler.shortcut = "down";
      this.snake.turn("", handler);
      expect(this.snake.dir).toEqual("S");
    });
    
    it("turns South when d is pressed", function () {
      handler.shortcut = "s";
      this.snake.turn("", handler);
      expect(this.snake.dir).toEqual("S");
    });
    
    it("turns North when up is pressed", function () {
      handler.shortcut = "up";
      this.snake.turn("", handler);
      expect(this.snake.dir).toEqual("N");
    });
    
    it("turns North when w is pressed", function () {
      handler.shortcut = "w";
      this.snake.turn("", handler);
      expect(this.snake.dir).toEqual("N");
    });
    
    it("turns West when left is pressed", function () {
      handler.shortcut = "left";
      this.snake.turn("", handler);
      expect(this.snake.dir).toEqual("W");
    });
    
    it("turns West when a is pressed", function () {
      handler.shortcut = "a";
      this.snake.turn("", handler);
      expect(this.snake.dir).toEqual("W");
    });
    
    it("turns East when right is pressed", function () {
      handler.shortcut = "right";
      this.snake.turn("", handler);
      expect(this.snake.dir).toEqual("E");
    });
    
    
  });

});