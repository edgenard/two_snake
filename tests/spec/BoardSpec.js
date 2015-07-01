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
  it("renders the board correctly", function () {
    this.board.snake1.segments = [[0,18], [0,19]];

    this.board.render($(".snake-board"));
    var ul = "ul:nth-of-type(" + (1) + ")";
    var li = "li:nth-of-type(" +(20) + ")";
    console.log($(".snake-board").children().first()[0].innerHTML);
    console.log($(ul + " " + li)[0].outerHTML);
    var cell = $(ul + " " + li)[0].outerHTML;
    expect(cell).toHaveCss({background: "black"})
  });

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
    expect(this.board.checkSnakes()).toEqual(false);
    expect(this.board.keepRendering).toEqual(false);
  });

  it("realizes when a snake has eaten another snake", function () {
    this.board.snake1.segments = [[0,0], [0,1], [0,2]];
    this.board.snake2.segments = [[1,0], [1,1], [1,2]];
    this.board.snake2.dir = "N";
    this.board.moveSnakes();
    expect(this.board.checkSnakes()).toEqual(false);
    expect(this.board.keepRendering).toEqual(false);

  });



  it("returns the high score and correct winner ", function () {
    this.board.snake1.segments = [[0,0], [0,1], [0,2]];
    this.board.snake2.segments = [[1,0], [1,1], [1,2]];
    this.board.snake2.dir = "N";
    this.board.snake2.score = 30;
    this.board.snake1.score = 10
    this.board.moveSnakes();
    this.board.checkSnakes();
    expect(this.board.winner()).toEqual("Black Snake");
    expect(this.board.highScore()).toEqual(10);
  });



});
