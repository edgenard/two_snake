#TwoSnake
A snake game with the option for two players to play at the same time. 
This was a fun game to build where I could practice OO JavaScript. I broke the game into three "classes" or prototypes:

* Snake
* Board
* Snake-View

## Snake Class
This class handled the snakes, their movement and their growth. It also kept track of their scores.

### Public API

* `segments` - This represented the position of the snake on the board at a given point in time.
* `color` - The color of the snake for drawing on the board. These are passed in as an option when creating the snake.
* `score` - The current score of the snake
* `move` - This moved the snake in the current direction 
* `addSegment` - This tells the snake to add a segment to itself. Also used by the move method, but that method first removes a segment. 

### "Private" API

*Not really private, anyone get at them but these methods are meant to be used internally by the snake.* 

* `turn` - This is a callback bound to shortcuts set by using the [Keymaster.js](https://github.com/madrobby/keymaster) library. It is called anytime the shortcuts set for a particular snake are fired. It turns the snake in the direction indicated by the shortcut.
* `head` - This creates a duplicate of the current head of the snake. This was used in the `#addSegment` method to add a new head to the snake without affecting the current head.
* `dir` - This is an instance variable that keeps track of the current direction the snake is going. 
* `shortcuts` - an option passed it when creating a new snake. This will tell it what keys to listen to when turning.
* `_dup` - This creates the duplicate of an array.


## Board Class
This creates 1 or 2 new snakes when initialized, builds a grid to represent the board, sets the apple, tells the snakes when to grow, keeps snakes visible and checks if they are still alive or dead. It's render method draws the representation of the current state of the board to the user.

### Public API
* `#render` - This is the "workhorse" method for this class and the whole game. It checks the state of the game  and represents its to the user.
  * Shows the position of the snakes
  * Shows the position of the apple. 
* `setApple` - This chooses a place on the board to set the apple. It checks to make sure that no snakes are occupying that place.
* `highScore` - This is gives the high score at the end of a game.
* `winner` - In two player games, this returns who won. 
* `keepRendering` - This is an instance variable that becomes false when one of the snakes has died by eating itself or the other snake.
 
### Private API

*Again not really private just internal methods.*

* `players` - an instance variable that keeps track of the number of snakes it is passed it as an argument when a new board is initialized.
* `snake1`,`snake2` - Created whenever a new board is initialized.
* `grid` - this grid the game is played on. An array of two element arrays.
* `_buildGrid` - builds the grid.
* `apple` - An instance variable that keeps track of where the apple is on the board.
* `checkSnakes` - this method makes sure that the snakes haven't eaten themselves or the other snake. This check is made in the render method.
* ``