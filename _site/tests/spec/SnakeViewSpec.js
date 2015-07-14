describe("Snake-View", function () {
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = "../tests/fixtures/";
    loadFixtures("board.html");
    view = new Snake.View($(".snake-board"), 2);

  });



  it("creates a board with right number of players", function () {
    expect(view.board.players).toEqual(2);
  });

  it("focuses on the board when initialized", function () {
     var spyFocus = spyOnEvent(".snake-board", "focus");
     var view = new Snake.View($(".snake-board"), 1);
     expect("focus").toHaveBeenTriggeredOn(".snake-board");
  });


  it("updates the score correctly on the page", function () {
    view.board.snake1.score = 50;
    view.board.snake2.score = 60;
    view.step();
    expect($(".snake-score-1 h3")[0]).toHaveText("50");
    expect($(".snake-score-2 h3")[0]).toHaveText("60");
  });


  it("shows the correct winner and high score", function () {
    view.board.snake1.score = 50;
    view.board.snake2.score = 0;
    view.stopPlaying();
    var winningScore = $(".end-screen .winning-score")[0].innerHTML
    expect($(".end-screen .winner")[0]).toHaveText("The winner is Black Snake");
    expect(winningScore).toEqual("The high score is 50")
  });

})
