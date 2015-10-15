describe("Body", function () {
  it("creates a body with the right attributes", function () {
    var body = new Snake.Body({
      segments: [[0,0], [0,1]],
      color: "black",
      dir: "E"
    });

    expect(body.segments).toEqual([[0,0], [0,1]]);
    expect(body.color).toBe("black");
    expect(body.dir).toBe("E");
  });

});
