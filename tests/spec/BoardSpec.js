describe("Board", function () {

  it("initialized with correct number of players", function () {
    var board1 = new Snake.board(1);
    expect(board1.players).toEqual(1);
    var board2 = new Snake.board(2);
    expect(board2.players).toEqual(2);
  });

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = "../tests/fixtures/";
    loadFixtures("board.html");
    this.board = new Snake.board(2);
  });
  xit("renders the board correctly");  // I think I should get rid of the rendering of ui in the render function and just test that the grid is reflecting the game state

  it("keep snakes visible", function () {
    this.board.snake1.segments = [[0,18], [0,19]]
    this.board.moveSnakes();
    this.board.keepSnakesVisible();
    expect(this.board.snake1.segments).toEqual([[0,19], [0,0]]);
  });

  it("sets the apple where the snakes are not", function () {
    for (var i = 0; i < 18; i++) {
      this.board.snake1.addSegment();
      this.board.snake2.addSegment();
      this.board.setApple();
      expect(this.board.snake1.segments).not.toEqual(jasmine.arrayContaining(this.board.apple))
    }


  });

  it("realizes when a snake has eaten itself", function () {
    this.board.snake1.segments = [[0, 2], [0, 3], [0,4], [1,4], [1, 3]]
    this.board.snake1.dir = "N";
    this.board.moveSnakes();
    console.log(this.board.snake1.segments);
    expect(this.board.checkSnakes()).toEqual(false);
    expect(this.board.keepRendering).toEqual(false);
  });

  it("checks that a snake has not eaten the other snake");

  it("stops rendering when one of the snakes has died");

  it("returns the high score");

  it("returns the correct winner");






});
