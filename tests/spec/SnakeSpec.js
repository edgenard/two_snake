describe("Snake", function () {
  beforeEach(function () {
    this.snake = new Snake.Snake({color: "black",
                                 startingPos: [[0,0], [0,1]],
                                 shortcuts: ["up", "down", "left", "right" ]});
  });

  it("creates a new body", function () {
    var body = this.snake._body;

    var result =  Snake.Body.prototype.isPrototypeOf(body);

    expect(result).toBeTruthy();
  });

  it("has the given color ", function () {

    expect(this.snake.getColor()).toEqual("black");
  });

  it("starts off pointing East", function () {

    expect(this.snake.getDir()).toEqual("E");
  });

  it ("starts off in the given position", function () {

    expect(this.snake.position()).toEqual([[0,0], [0,1]]);
  });

  it("moves East",function(){
    this.snake.move();

    expect(this.snake.position()).toEqual([[0, 1],[0,2]]);

  });

  it("moves South", function () {
    this.snake._body._dir = "S";

    this.snake.move();

    expect(this.snake.position()).toEqual([[0, 1], [1,1]]);
  });


  it("moves North", function () {
    this.snake._body._dir = "N";

    this.snake.move();

    expect(this.snake.position()).toEqual([[0,1], [-1,1]]);
  });

  it("moves West", function() {
    this.snake._body._dir = "W";

    this.snake.move();

    expect(this.snake.position()).toEqual([[0,1], [0,0]]);
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

    it("turns South when s is pressed", function () {
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
      this.snake.grow();

      expect(this.snake.position()).toEqual([[0,0], [0, 1], [0, 2]]);
    });
  });

});
