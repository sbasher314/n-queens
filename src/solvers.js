/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var testBoard = new Board({'n': n});

  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      testBoard.togglePiece(rowIndex, colIndex);
      if (testBoard.hasRowConflictAt(rowIndex) || testBoard.hasColConflictAt(colIndex)) {
        testBoard.togglePiece(rowIndex, colIndex);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(testBoard.rows()));
  return testBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let solutionCount = 0;
  let testBoard = new Board({'n': n});

  let recursiveSolutionFinder = function (board, rowIndex) {
    let isRow0 = (rowIndex === 0);
    let adjustedN = isRow0 ? n / 2 : n;
    for (let colIndex = 0; colIndex < adjustedN; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasColConflictAt(colIndex)) {
        if (rowIndex === n - 1) {
          solutionCount++;
        } else {
          recursiveSolutionFinder(board, rowIndex + 1);
        }
      }
      board.togglePiece(rowIndex, colIndex);
      if (isRow0 && colIndex === Math.floor(n / 2) - 1) {
        solutionCount = solutionCount * 2;
      }
    }
  };

  //recursiveSolutionFinder(testBoard, 0);

  const factorial = function (n) {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  };

  solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var testBoard = new Board({'n': n});

  var recursiveSolutionFinder = function (board, rowIndex) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasColConflictAt(colIndex)
      && !board.hasMajorDiagonalConflictAt(colIndex - rowIndex)
      && !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)) {
        if (rowIndex === n - 1) {
          return true;
        } else {
          if (recursiveSolutionFinder(board, rowIndex + 1)) {
            return true;
          }
        }
      }
      board.togglePiece(rowIndex, colIndex);
    }
  };

  recursiveSolutionFinder(testBoard, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(testBoard.rows()));
  return testBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  if (n === 0) {
    return 1;
  }

  let solutionCount = 0;
  let testBoard = new Board({'n': n});

  var recursiveSolutionFinder = function (board, rowIndex) {
    let isRow0 = (rowIndex === 0);
    let adjustedN = isRow0 ? n / 2 : n;
    for (let colIndex = 0; colIndex < adjustedN; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasColConflictAt(colIndex)
      && !board.hasMajorDiagonalConflictAt(colIndex - rowIndex)
      && !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)) {
        if (rowIndex === n - 1) {
          solutionCount++;
        } else {
          recursiveSolutionFinder(board, rowIndex + 1);
        }
      }
      board.togglePiece(rowIndex, colIndex);
      if (isRow0 && colIndex === Math.floor(n / 2) - 1) {
        solutionCount = solutionCount * 2;
      }
    }
  };

  recursiveSolutionFinder(testBoard, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};