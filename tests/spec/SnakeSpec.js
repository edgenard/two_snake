describe("Snake", function () {
  beforeEach(function () {
    this.snake = new Snake.Snake({color: "black",
                                 startingPos: [[0,0], [0,1]],
                                 shortcuts: ["up", "down", "left", "right" ]});
  });

  it("starts off with the given options ", function () {
    expect(this.snake.segments).toEqual([[0,0], [0, 1]]);
    expect(this.snake.color).toBe("black");
    expect(this.snake._dir).toEqual("E");
    expect(this.snake.score).toEqual(0);
  });

  it("moves East",function(){
    this.snake.move();
    expect(this.snake.segments).toEqual([[0, 1],[0,2]]);

  });

  it("moves South", function () {
    this.snake._dir = "S";
    this.snake.move();
    expect(this.snake.segments).toEqual([[0, 1], [1,1]]);
  });


  it("moves North", function () {
    this.snake._dir = "N";
    this.snake.move();
    expect(this.snake.segments).toEqual([[0,1], [-1,1]]);
  });

  it("moves West", function() {
    this.snake._dir = "W";
    this.snake.move();
    expect(this.snake.segments).toEqual([[0,1], [0,0]]);
  });

  describe("turning", function () {
    var handler = {};

    it("does not turn back on itself", function () {
      handler.shortcut = "left";
      this.snake._dir = "E";
      this.snake.turn("", handler);
      expect(this.snake._dir).toEqual("E");
    });

    it("turns South when down is pressed", function () {
      handler.shortcut = "down";
      this.snake.turn("", handler);
      expect(this.snake._dir).toEqual("S");
    });

    it("turns South when d is pressed", function () {
      handler.shortcut = "s";
      this.snake.turn("", handler);
      expect(this.snake._dir).toEqual("S");
    });

    it("turns North when up is pressed", function () {
      handler.shortcut = "up";
      this.snake.turn("", handler);
      expect(this.snake._dir).toEqual("N");
    });

    it("turns North when w is pressed", function () {
      handler.shortcut = "w";
      this.snake.turn("", handler);
      expect(this.snake._dir).toEqual("N");
    });



    it("turns West when left is pressed", function () {
      this.snake._dir = "S";
      handler.shortcut = "left";
      this.snake.turn("", handler);
      expect(this.snake._dir).toEqual("W");
    });

    it("turns West when a is pressed", function () {
      this.snake._dir = "S";
      handler.shortcut = "a";
      this.snake.turn("", handler);
      expect(this.snake._dir).toEqual("W");
    });

    it("turns East when right is pressed", function () {
      handler.shortcut = "right";
      this.snake.turn("", handler);
      expect(this.snake._dir).toEqual("E");
    });


  });

  describe("growing snake", function () {
    it("grows", function () {
      this.snake.addSegment();
      expect(this.snake.segments).toEqual([[0,0], [0, 1], [0, 2]]);
    });
  });

});
