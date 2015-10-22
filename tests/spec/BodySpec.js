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

});
