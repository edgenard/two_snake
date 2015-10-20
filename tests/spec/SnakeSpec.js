describe("Snake", function () {
  "use strict";
  beforeEach(function () {
    this.snake = new Snake.Snake(
      {
        color: "black",
        startingPos: [[0,0], [0,1]],
        shortcuts: ["up", "down", "left", "right" ]
      }
    );
  });

  it("creates a new body on initialization", function () {
    var result = Snake.Body.prototype.isPrototypeOf(this.snake._body);

    expect(result).toBeTruthy();
  });

  it("gets position from body", function () {
    var position = this.snake.position();

    expect(position).toEqual([[0,0], [0,1]]);
  });


  it("moves East",function(){
    this.snake.move();

    expect(this.snake.position()).toEqual([[0, 1],[0,2]]);

  });

  it("moves South", function () {
    this.snake.turn("_", {shortcut: "down"});

    this.snake.move();

    expect(this.snake.position()).toEqual([[0, 1], [1,1]]);
  });


  it("moves North", function () {
    this.snake.turn("_", {shortcut: "up"});

    this.snake.move();

    expect(this.snake.position()).toEqual([[0,1], [-1,1]]);
  });

  it("moves West", function() {
    this.snake.turn("_", {shortcut: "down"});
    this.snake.turn("_", {shortcut: "left"});

    this.snake.move();

    expect(this.snake.position()).toEqual([[0,1], [0,0]]);
  });

  describe("turning", function () {
    var handler = {};

    it("tells the body to go down when down is pressed", function () {
      handler.shortcut = "down";
      spyOn(this.snake._body, "turn");

      this.snake.turn("", handler);

      expect(this.snake._body.turn).toHaveBeenCalledWith("down");
    });

    it("it tells the body to go down when s is pressed", function () {
      handler.shortcut = "s";
      spyOn(this.snake._body, "turn");

      this.snake.turn("", handler);

      expect(this.snake._body.turn).toHaveBeenCalledWith("down");
    });

    it("it tells the body to go up when up is pressed", function () {
      handler.shortcut = "up";
      spyOn(this.snake._body, "turn");

      this.snake.turn("", handler);

      expect(this.snake._body.turn).toHaveBeenCalledWith("up");
    });

    it("it tells the body to go up when w is pressed", function () {
      handler.shortcut = "w";
      spyOn(this.snake._body, "turn");

      this.snake.turn("", handler);

      expect(this.snake._body.turn).toHaveBeenCalledWith("up");
    });



    it("it tells the bdoy to go left when left is pressed", function () {
      handler.shortcut = "left";
      spyOn(this.snake._body, "turn");

      this.snake.turn("", handler);

      expect(this.snake._body.turn).toHaveBeenCalledWith("left");
    });

    it("tells the body to go left when a is pressed", function () {
      handler.shortcut = "a";
      spyOn(this.snake._body, "turn");

      this.snake.turn("", handler);

      expect(this.snake._body.turn).toHaveBeenCalledWith("left");
    });

    it("tells the body to go right when right is pressed", function () {
      handler.shortcut = "right";
      spyOn(this.snake._body, "turn");

      this.snake.turn("", handler);

      expect(this.snake._body.turn).toHaveBeenCalledWith("right");
    });

    it("tells the body to go right when d is pressed", function () {
      handler.shortcut =  "d";
      spyOn(this.snake._body, "turn");

      this.snake.turn("", handler);

      expect(this.snake._body.turn).toHaveBeenCalledWith("right");
    });


  });

  describe("growing snake", function () {
    it("grows", function () {
      this.snake.grow();
      expect(this.snake.position()).toEqual([[0,0], [0, 1], [0, 2]]);
    });
  });

});
