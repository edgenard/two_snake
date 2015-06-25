describe("Board", function () {
  
  it("initialized with correct number of players", function () {
    var board1 = new Snake.board(1);
    expect(board1.players).toEqual(1);
    var board2 = new Snake.board(2);
    expect(board2.players).toEqual(2);
  });
  // I think I should get rid of the rendering of ui in the render function and just test that the grid is reflecting the game state
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = "../tests/fixtures/";
    loadFixtures("board.html");
  });
  it("renders the board correctly");
  
  it("keep snakes visible");
  
  it("sets the apple");
  
  it("checks that a snake has not eaten itself", function () {
    var board = new Snake.board(1);
    spyOn(board, "checkSnakes");
    board.render($(".snake-board"));
    expect(board.checkSnakes()).toHaveBeenCalled();
  });
  
  it("checks that a snake has not eaten the other snake");
  
  it("stops rendering when one of the snakes has died");
  
  it("returns the high score");
  
  it("returns the correct winner");
  
  
  
});