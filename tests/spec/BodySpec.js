describe("Body", function () {

  beforeEach(function () {
    this.body = new Snake.Body({
      segments: [[0,0], [0,1]],
      color: "black",
      dir: "E"
    });
  });


  it("has the right color", function () {
    var color = this.body.getColor();

    expect(color).toEqual("black");
  });

  it("has the right position", function () {
    var position = this.body.position();

    expect(position).toEqual([[0,0], [0,1]]);
  });

  it("removes tail", function () {
    this.body.removeTail();

    var result = this.body.position();

    expect(result).toEqual([[0,1]]);
  });

  it("grows", function () {
    this.body.grow();

    expect(this.body.position()).toEqual([[0,0], [0,1], [0,2]]);
  });

});
