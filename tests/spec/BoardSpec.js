describe("Board", function () {

  it("initialized with correct number of players", function () {
    var board1 = new Snake.Board(1);
    expect(board1.players).toEqual(1);
    var board2 = new Snake.Board(2);
    expect(board2.players).toEqual(2);
  });

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/tests/fixtures/';
    loadFixtures("board.html");
    this.board = new Snake.Board(2);
  });
  // Firefox adds the whole background vallues instead of the just the color
  it("renders the snake correctly", function () {
    this.board.snake1._segments = [[0,18], [0,19]];

    this.board.render($(".snake-board"));
    var snakeRow = this.board.snake1._segments[0][0] + 1;
    var snakeCol = this.board.snake1._segments[0][1] + 1;

    var ulSnake = "ul:nth-of-type(" + snakeRow + ")";
    var liSnake = "li:nth-of-type(" + snakeCol + ")";
    var cellSnake = $(ulSnake + " " + liSnake)[0].outerHTML;
    expect(cellSnake).toHaveCss({"background-color": "black"});
  });

  it("renders the apple correctly", function () {
    this.board.render($(".snake-board"));
    var appleRow = this.board.apple[0] + 1;
    var appleCol = this.board.apple[0] + 1;
    var ulApple =  "ul:nth-of-type(" + appleRow + ")";
    var liApple = "li:nth-of-type(" + appleCol + ")";
    var cellApple = $(ulApple + " " + liApple)[0].outerHTML;
    expect(cellApple).toHaveCss({"background-color": "red"});
  });


  it("keep snakes visible", function () {
    this.board.snake1._segments = [[0,18], [0,19]];
    this.board.moveSnakes();
    this.board.keepSnakesVisible();
    expect(this.board.snake1._segments).toEqual([[0,19], [0,0]]);
  });

  it("sets the apple where the snakes are not", function () {
    for (var i = 0; i < 18; i++) {
      this.board.snake1.addSegment();
      this.board.snake2.addSegment();
      this.board.setApple();
      expect(this.board.snake1._segments).not.toEqual(jasmine.arrayContaining(this.board.apple));
    }


  });

  it("realizes when a snake has eaten itself", function () {
    this.board.snake1._segments = [[0, 2], [0, 3], [0,4], [1,4], [1, 3]];
    this.board.snake1._dir = "N";
    this.board.moveSnakes();
    expect(this.board.checkSnakes()).toEqual(false);
    expect(this.board.keepRendering).toEqual(false);
  });

  it("realizes when a snake has eaten another snake", function () {
    this.board.snake1._segments = [[0,0], [0,1], [0,2]];
    this.board.snake2._segments = [[1,0], [1,1], [1,2]];
    this.board.snake2._dir = "N";
    this.board.moveSnakes();
    expect(this.board.checkSnakes()).toEqual(false);
    expect(this.board.keepRendering).toEqual(false);

  });



  it("returns the high score and correct winner ", function () {
    this.board.snake1._segments = [[0,0], [0,1], [0,2]];
    this.board.snake2._segments = [[1,0], [1,1], [1,2]];
    this.board.snake2._dir = "N";
    this.board.snake2._score = 30;
    this.board.snake1._score = 10;
    this.board.moveSnakes();
    this.board.checkSnakes();
    expect(this.board.winner()).toEqual("Black Snake");
    expect(this.board.highScore()).toEqual(10);
  });



});
