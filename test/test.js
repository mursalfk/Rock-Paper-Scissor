var fs = require('fs');
var vm = require('vm');
var path = 'js/game-logic.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

var should = require('chai').should();

describe('Player Moves', function() {
  it('a global variable called playerOneMoveOneType should exist and initialize to undefined', function() {
    should.equal(playerOneMoveOneType, undefined);
  });

  it('a global variable called playerOneMoveTwoType should exist and initialize to undefined', function() {
    should.equal(playerOneMoveTwoType, undefined);
  });

  it('a global variable called playerOneMoveThreeType should exist and initialize to undefined', function() {
    should.equal(playerOneMoveThreeType, undefined);
  });

  it('a global variable called playerTwoMoveOneType should exist and initialize to undefined', function() {
    should.equal(playerTwoMoveOneType, undefined);
  });

  it('a global variable called playerTwoMoveTwoType should exist and initialize to undefined', function() {
    should.equal(playerTwoMoveTwoType, undefined);
  });

  it('a global variable called playerTwoMoveThreeType should exist and initialize to undefined', function() {
    should.equal(playerTwoMoveTwoType, undefined);
  });

  it('a global variable called playerOneMoveOneValue should exist and initialize to undefined', function() {
    should.equal(playerOneMoveOneValue, undefined);
  });

  it('a global variable called playerOneMoveTwoValue should exist and initialize to undefined', function() {
    should.equal(playerOneMoveTwoValue, undefined);
  });

  it('a global variable called playerOneMoveThreeValue should exist and initialize to undefined', function() {
    should.equal(playerOneMoveThreeValue, undefined);
  });

  it('a global variable called playerTwoMoveOneValue should exist and initialize to undefined', function() {
    should.equal(playerTwoMoveOneValue, undefined);
  });

  it('a global variable called playerTwoMoveTwoValue should exist and initialize to undefined', function() {
    should.equal(playerTwoMoveTwoValue, undefined);
  });

  it('a global variable called playerTwoMoveThreeValue should exist and initialize to undefined', function() {
    should.equal(playerTwoMoveThreeValue, undefined);
  });
});

describe('setPlayerMoves() - Main Functionality', function() {
  afterEach(clearMoves);

  it('a function called setPlayerMoves should exist', function() {
    should.equal(typeof setPlayerMoves, 'function');
  });

  it('should set player one\'s moves with valid inputs', function() {
    setPlayerMoves('Player One', 'rock', 11, 'paper', 33, 'scissors', 55);

    should.equal(playerOneMoveOneType, 'rock');
    should.equal(playerOneMoveOneValue, 11);
    should.equal(playerOneMoveTwoType, 'paper');
    should.equal(playerOneMoveTwoValue, 33);
    should.equal(playerOneMoveThreeType, 'scissors');
    should.equal(playerOneMoveThreeValue, 55);
  });

  it('should set player two\'s moves with valid inputs', function() {
    setPlayerMoves('Player Two', 'rock', 11, 'paper', 33, 'scissors', 55);

    should.equal(playerTwoMoveOneType, 'rock');
    should.equal(playerTwoMoveOneValue, 11);
    should.equal(playerTwoMoveTwoType, 'paper');
    should.equal(playerTwoMoveTwoValue, 33);
    should.equal(playerTwoMoveThreeType, 'scissors');
    should.equal(playerTwoMoveThreeValue, 55);
  });
});

describe('setPlayerMoves() - Edge Cases', function() {
  afterEach(clearMoves);

  it('should not set moves if a move type is missing', function() {
    setPlayerMoves('Player One', undefined, 11, 'paper', 33, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 11, undefined, 33, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 11, 'paper', 33, undefined, 55);

    should.equal(playerOneMoveOneType, undefined);
    should.equal(playerOneMoveOneValue, undefined);
    should.equal(playerOneMoveTwoType, undefined);
    should.equal(playerOneMoveTwoValue, undefined);
    should.equal(playerOneMoveThreeType, undefined);
    should.equal(playerOneMoveThreeValue, undefined);
  });

  it('should not set moves if an invalid player is supplied', function() {
    setPlayerMoves('Fake Player', 'rock', 11, 'paper', 33, 'scissors', 55);

    should.equal(playerOneMoveOneType, undefined);
    should.equal(playerOneMoveOneValue, undefined);
    should.equal(playerOneMoveTwoType, undefined);
    should.equal(playerOneMoveTwoValue, undefined);
    should.equal(playerOneMoveThreeType, undefined);
    should.equal(playerOneMoveThreeValue, undefined);
  });

  it('should not set moves if a move value is missing', function() {
    setPlayerMoves('Player One', 'rock', undefined, 'paper', 33, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 11, 'paper', undefined, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 11, 'paper', 33, 'scissors', undefined);

    should.equal(playerOneMoveOneType, undefined);
    should.equal(playerOneMoveOneValue, undefined);
    should.equal(playerOneMoveTwoType, undefined);
    should.equal(playerOneMoveTwoValue, undefined);
    should.equal(playerOneMoveThreeType, undefined);
    should.equal(playerOneMoveThreeValue, undefined);
  });

  it('should not set moves if an invalid move type is supplied', function() {
    setPlayerMoves('Player One', 'fake move', 11, 'paper', 33, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 11, 'fake move', 33, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 11, 'paper', 33, 'fake move', 55);

    should.equal(playerOneMoveOneType, undefined);
    should.equal(playerOneMoveOneValue, undefined);
    should.equal(playerOneMoveTwoType, undefined);
    should.equal(playerOneMoveTwoValue, undefined);
    should.equal(playerOneMoveThreeType, undefined);
    should.equal(playerOneMoveThreeValue, undefined);
  });

  it('should not set moves if any move values are less than one', function() {
    setPlayerMoves('Player One', 'rock', 0, 'paper', 33, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 20, 'paper', -100, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 20, 'paper', 33, 'scissors', -1000);

    should.equal(playerOneMoveOneType, undefined);
    should.equal(playerOneMoveOneValue, undefined);
    should.equal(playerOneMoveTwoType, undefined);
    should.equal(playerOneMoveTwoValue, undefined);
    should.equal(playerOneMoveThreeType, undefined);
    should.equal(playerOneMoveThreeValue, undefined);
  });

  it('should not set moves if any move values are greater than ninety-nine', function() {
    setPlayerMoves('Player One', 'rock', 100, 'paper', 33, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 20, 'paper', 1000, 'scissors', 55);
    setPlayerMoves('Player One', 'rock', 20, 'paper', 33, 'scissors', 10000);

    should.equal(playerOneMoveOneType, undefined);
    should.equal(playerOneMoveOneValue, undefined);
    should.equal(playerOneMoveTwoType, undefined);
    should.equal(playerOneMoveTwoValue, undefined);
    should.equal(playerOneMoveThreeType, undefined);
    should.equal(playerOneMoveThreeValue, undefined);
  });

  it('should not set moves if move values sum to more than ninety-nine', function() {
    setPlayerMoves('Player One', 'rock', 33, 'paper', 33, 'scissors', 34);

    should.equal(playerOneMoveOneType, undefined);
    should.equal(playerOneMoveOneValue, undefined);
    should.equal(playerOneMoveTwoType, undefined);
    should.equal(playerOneMoveTwoValue, undefined);
    should.equal(playerOneMoveThreeType, undefined);
    should.equal(playerOneMoveThreeValue, undefined);
  });
});

describe('getRoundWinner() - Main Functionality', function() {
  it('a function called getRoundWinner should exist', function() {
    should.equal(typeof getRoundWinner, 'function');
  });

  it('should return the correct winner with rock versus scissors', function() {
    playerOneMoveOneType = 'rock';
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'scissors';
    playerTwoMoveOneValue = 99;

    should.equal(getRoundWinner(1), 'Player One');
  });

  it('should return the correct winner with rock versus paper', function() {
    playerOneMoveOneType = 'rock';
    playerOneMoveOneValue = 99;
    playerTwoMoveOneType = 'paper';
    playerTwoMoveOneValue = 1;

    should.equal(getRoundWinner(1), 'Player Two');
  });

  it('should return the correct winner with paper versus scissors', function() {
    playerOneMoveOneType = 'scissors';
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'paper';
    playerTwoMoveOneValue = 99;

    should.equal(getRoundWinner(1), 'Player One');
  });

  it('should return the correct winner with two of the same move type and different values', function() {
    playerOneMoveOneType = 'scissors';
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'scissors';
    playerTwoMoveOneValue = 99;

    should.equal(getRoundWinner(1), 'Player Two');
  });

  it('should return the correct winner with two of the same move type and the same value', function() {
    playerOneMoveOneType = 'scissors';
    playerOneMoveOneValue = 99;
    playerTwoMoveOneType = 'scissors';
    playerTwoMoveOneValue = 99;

    should.equal(getRoundWinner(1), 'Tie');
  });

  it('should return the correct winner for round one', function() {
    playerOneMoveOneType = 'scissors';
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'rock';
    playerTwoMoveOneValue = 99;

    should.equal(getRoundWinner(1), 'Player Two');
  });

  it('should return the correct winner for round two', function() {
    playerOneMoveTwoType = 'scissors';
    playerOneMoveTwoValue = 1;
    playerTwoMoveTwoType = 'rock';
    playerTwoMoveTwoValue = 99;

    should.equal(getRoundWinner(2), 'Player Two');
  });

  it('should return the correct winner for round three', function() {
    playerOneMoveThreeType = 'scissors';
    playerOneMoveThreeValue = 1;
    playerTwoMoveThreeType = 'rock';
    playerTwoMoveThreeValue = 99;

    should.equal(getRoundWinner(3), 'Player Two');
  });
});

describe('getRoundWinner() - Edge Cases', function() {
  it('should return null for an invalid round number', function() {
    should.equal(getRoundWinner(4), null);
  });

  it('should return null if any move types or values are missing', function() {
    playerOneMoveOneType = undefined;
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'rock';
    playerTwoMoveOneValue = 99;

    should.equal(getRoundWinner(1), null);

    playerOneMoveOneType = 'rock';
    playerOneMoveOneValue = undefined;
    playerTwoMoveOneType = 'rock';
    playerTwoMoveOneValue = 99;

    should.equal(getRoundWinner(1), null);

    playerOneMoveOneType = 'rock';
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = undefined;
    playerTwoMoveOneValue = 99;

    should.equal(getRoundWinner(1), null);

    playerOneMoveOneType = 'rock';
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'rock';
    playerTwoMoveOneValue = undefined;

    should.equal(getRoundWinner(1), null);

    playerOneMoveTwoType = 'rock';
    playerOneMoveTwoValue = 1;
    playerTwoMoveTwoType = 'rock';
    playerTwoMoveTwoValue = undefined;

    should.equal(getRoundWinner(2), null);

    playerOneMoveThreeType = 'rock';
    playerOneMoveThreeValue = 1;
    playerTwoMoveThreeType = 'rock';
    playerTwoMoveThreeValue = undefined;

    should.equal(getRoundWinner(3), null);
  });
});

describe('getGameWinner() - Main Functionality', function() {
  it('a function called getGameWinner should exist', function() {
    should.equal(typeof getGameWinner, 'function');
  });

  it('should declare when player one wins', function() {
    playerOneMoveOneType = 'rock';
    playerOneMoveOneValue = 53;
    playerTwoMoveOneType = 'rock';
    playerTwoMoveOneValue = 1;
    playerOneMoveTwoType = 'paper';
    playerOneMoveTwoValue = 1;
    playerTwoMoveTwoType = 'rock';
    playerTwoMoveTwoValue = 97;
    playerOneMoveThreeType = 'scissors';
    playerOneMoveThreeValue = 45;
    playerTwoMoveThreeType = 'rock';
    playerTwoMoveThreeValue = 1;

    should.equal(getGameWinner(), 'Player One');
  });

  it('should declare when player two wins', function() {
    playerOneMoveOneType = 'rock';
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'rock';
    playerTwoMoveOneValue = 53;
    playerOneMoveTwoType = 'rock';
    playerOneMoveTwoValue = 97;
    playerTwoMoveTwoType = 'paper';
    playerTwoMoveTwoValue = 1;
    playerOneMoveThreeType = 'rock';
    playerOneMoveThreeValue = 1;
    playerTwoMoveThreeType = 'scissors';
    playerTwoMoveThreeValue = 45;

    should.equal(getGameWinner(), 'Player Two');
  });

  it('should declare when the game is a tie', function() {
    playerOneMoveOneType = 'rock';
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'rock';
    playerTwoMoveOneValue = 48;
    playerOneMoveTwoType = 'scissors';
    playerOneMoveTwoValue = 48;
    playerTwoMoveTwoType = 'paper';
    playerTwoMoveTwoValue = 1;
    playerOneMoveThreeType = 'rock';
    playerOneMoveThreeValue = 50;
    playerTwoMoveThreeType = 'rock';
    playerTwoMoveThreeValue = 50;

    should.equal(getGameWinner(), 'Tie');
  });
});

describe('getGameWinner() - Main Functionality', function() {
  it('should return null if not all values are set', function() {
    playerOneMoveOneType = undefined;
    playerOneMoveOneValue = 1;
    playerTwoMoveOneType = 'rock';
    playerTwoMoveOneValue = 48;
    playerOneMoveTwoType = 'scissors';
    playerOneMoveTwoValue = 48;
    playerTwoMoveTwoType = 'paper';
    playerTwoMoveTwoValue = 1;
    playerOneMoveThreeType = 'rock';
    playerOneMoveThreeValue = 50;
    playerTwoMoveThreeType = 'rock';
    playerTwoMoveThreeValue = 50;

    should.equal(getGameWinner(), null);
  });
});


describe('BONUS: setComputerMoves()', function() {
  const validMoves = ['rock', 'paper', 'scissors'];

  afterEach(clearMoves);

  it('a function called setComputerMoves should exist', function() {
    should.equal(typeof setComputerMoves, 'function');
  });

  it('should set player two\'s move types to valid move types', function() {
    setComputerMoves();

    should.equal(validMoves.includes(playerTwoMoveOneType), true);
    should.equal(validMoves.includes(playerTwoMoveTwoType), true);
    should.equal(validMoves.includes(playerTwoMoveThreeType), true);
  });

  it('should set player two\'s move values to valid move values', function() {
    setComputerMoves();

    (playerTwoMoveOneValue).should.be.above(0);
    (playerTwoMoveOneValue).should.be.below(100);
    (playerTwoMoveTwoValue).should.be.above(0);
    (playerTwoMoveTwoValue).should.be.below(100);
    (playerTwoMoveThreeValue).should.be.above(0);
    (playerTwoMoveThreeValue).should.be.below(100);
  });

  it('should set player two\'s move values to three values that sum to ninety-nine', function() {
    setComputerMoves();

    should.equal(playerTwoMoveOneValue + playerTwoMoveTwoValue + playerTwoMoveThreeValue, 99);
  });
});

function clearMoves() {
  playerOneMoveOneType = undefined;
  playerOneMoveTwoType = undefined;
  playerOneMoveThreeType = undefined;
  playerOneMoveOneValue = undefined;
  playerOneMoveTwoValue = undefined;
  playerOneMoveThreeValue = undefined;
  playerTwoMoveOneType = undefined;
  playerTwoMoveTwoType = undefined;
  playerTwoMoveThreeType = undefined;
  playerTwoMoveOneValue = undefined;
  playerTwoMoveTwoValue = undefined;
  playerTwoMoveThreeValue = undefined;
}