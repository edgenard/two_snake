describe("Snake-View", function () {
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = "../tests/fixtures/";
    loadFixtures("board.html");
    view = new Snake.view($(".snake-board"), 2);

  });



  it("creates a board with right number of players when initialized", function () {
    expect(view.board.players).toEqual(2);
  });

  it("focuses on the board when initialized", function () {
     var spyFocus = spyOnEvent(".snake-board", "focus");
     var view = new Snake.view($(".snake-board"), 1);
     expect("focus").toHaveBeenTriggeredOn(".snake-board");
  });

  xit("calls step every 100 milliseconds", function () {
    jasmine.clock().install();
    spyOn(view, "step");

    expect(view.step).not.toHaveBeenCalled();
    jasmine.clock().tick(200);
    expect(view.step).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it("calls appleMove every 5 seconds");

  it("updates the score correctly on the page");

  it("it clears the intervals when game is over ");

  it("shows the right score for each snake");

  it("shows the correct winner");

})
