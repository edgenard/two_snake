describe("Body", function () {
  it("creates a body with the right attributes", function () {
    var body = new Snake.Body({
      segments: [[0,0], [0,1]],
      color: "black",
      dir: "E"
    });

    expect(body.getSegments()).toEqual([[0,0], [0,1]]);
    expect(body.getColor()).toBe("black");
    expect(body.getDir()).toBe("E");
  });
  beforeEach(function () {
    this.body = new Snake.Body({
      segments: [[0,0], [0,1]],
      color: "black",
      dir: "E"
    });

  });

  it("grows", function () {

    this.body.grow();

    expect(this.body.getSegments()).toEqual([[0,0], [0,1], [0,2]]);

  });

  it("grows in the right direction", function () {
    this.body._dir = "S";

    this.body.grow();

    expect(this.body.getSegments()).toEqual([[0,0], [0,1], [1,1]]);
  });

  it("moves east", function () {

    this.body.move();

    expect(this.body.getSegments()).toEqual([[0,1],[0,2]]);
  });

  it("moves west", function () {
    this.body._dir = "W";

    this.body.move();

    expect(this.body.getSegments()).toEqual([[0,1], [0,0]]);
  });

  it("moves south", function () {
    this.body._dir = "S";

    this.body.move();

    expect(this.body.getSegments()).toEqual([[0, 1], [1,1]]);
  });

  it("moves north", function () {
    this.body._dir = "N";

    this.body.move();

    expect(this.body.getSegments()).toEqual([[0,1], [-1,1]]);
  });

});
