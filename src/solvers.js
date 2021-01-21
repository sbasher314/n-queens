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


// iterate through n
// start n new chessboards, each with a piece at a different column of row 0
// iterate through n
// for each chessboard we have
// start a new chessboard, each with a piece at a different column of row 1, except for when there would be a conflict
// continue for the rest of n times
// newBoard = new Board(matrix);

window.findNRooksSolution = function(n) {
  var solution = [];
  var testBoard = new Board({'n': n});
  // for each row
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    // for each column
    for (var colIndex = 0; colIndex < n; colIndex++) {
      // place a piece
      testBoard.togglePiece(rowIndex, colIndex);
      // if there's a conflict, pick that piece back up and move on
      if (testBoard.hasRowConflictAt(rowIndex) || testBoard.hasColConflictAt(colIndex)) {
        testBoard.togglePiece(rowIndex, colIndex);
      }
    }
    // Push the row to our solution
    solution.push(testBoard.get(rowIndex));
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var testBoard = new Board({'n': n});

  var recursiveSolutionFinder = function (board, rowIndex) {
    if (rowIndex === n - 1) {
      for (var colIndex = 0; colIndex < n; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasColConflictAt(colIndex)) {
          solutionCount++;
        }
        board.togglePiece(rowIndex, colIndex);
      }
    } else {
      for (var colIndex = 0; colIndex < n; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasColConflictAt(colIndex)) {
          var newBoard = new Board(board.values().slice(0, -1));
          recursiveSolutionFinder(newBoard, rowIndex + 1);
        }
        board.togglePiece(rowIndex, colIndex);
      }
    }
  };

  recursiveSolutionFinder(testBoard, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // var solution = [];
  // var testBoard = new Board({'n': n});
  // var solutionFound = false;
  // if (n === 0) {
  //   //return solution;
  // }

  // var recursiveSolutionFinder = function (board, rowIndex) {

  //   // if we're on the last row
  //   if (rowIndex === n - 1) {
  //     // iterate over each column
  //     for (var colIndex = 0; colIndex < n; colIndex++) {
  //       // add a piece in each location
  //       board.togglePiece(rowIndex, colIndex);
  //       if (!board.hasColConflictAt(colIndex)
  //       && !board.hasMajorDiagonalConflictAt(colIndex - rowIndex)
  //       && !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)
  //       ) {
  //         solutionFound = true;
  //         // for (var i = 0; i < n; i++) {
  //         //   solution.push(board.get(i));
  //         // }
  //         solution[rowIndex] = board.get(rowIndex);
  //         return;
  //       }
  //       board.togglePiece(rowIndex, colIndex);
  //     }
  //   } else {
  //     for (var colIndex = 0; colIndex < n; colIndex++) {
  //       board.togglePiece(rowIndex, colIndex);
  //       if (!board.hasColConflictAt(colIndex)
  //       && !board.hasMajorDiagonalConflictAt(colIndex - rowIndex)
  //       && !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)) {
  //         solution[rowIndex] = board.get(rowIndex);
  //         console.log(solution);
  //         var newBoard = new Board(board.values().slice(0, -1));
  //         recursiveSolutionFinder(newBoard, rowIndex + 1);
  //       }
  //       board.togglePiece(rowIndex, colIndex);
  //     }
  //   }

  //   console.log(board);
  // };

  // recursiveSolutionFinder(testBoard, 0);

  var solution = [];

  if (n === 0) {
    return solution;
  }

  var queenChecker = function (initialColIndex) {
    solution = [];
    var testBoard = new Board({'n': n});
    // for each row
    for (var rowIndex = 0; rowIndex < n; rowIndex++) {
      // for each column
      for (var colIndex = initialColIndex; colIndex < n + initialColIndex; colIndex++) {
        // place a piece
        testBoard.togglePiece(rowIndex, colIndex % n);
        // if there's a conflict, pick that piece back up and move on
        if (testBoard.hasRowConflictAt(rowIndex)
        || testBoard.hasColConflictAt(colIndex % n)
        || testBoard.hasMajorDiagonalConflictAt(colIndex % n - rowIndex)
        || testBoard.hasMinorDiagonalConflictAt(colIndex % n + rowIndex)) {
          testBoard.togglePiece(rowIndex, colIndex % n);
        }
      }
      // Push the row to our solution
      solution.push(testBoard.get(rowIndex));
    }
    var sum = solution.flat().reduce((a, b) => a + b);
    console.log(solution);
    console.log('n:' + n);
    console.log(sum);
    console.log(sum === n);
    return sum === n;
  };

  for (var i = 0; i < n; i++) {
    if (queenChecker(i)) {
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      return solution;
    }
  }

  solution = [];
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;
  var testBoard = new Board({'n': n});

  var recursiveSolutionFinder = function (board, rowIndex) {

    // if we're on the last row
    if (rowIndex === n - 1) {
      for (var colIndex = 0; colIndex < n; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasColConflictAt(colIndex)
        && !board.hasMajorDiagonalConflictAt(colIndex - rowIndex)
        && !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)
        ) {
          solutionCount++;
        }
        board.togglePiece(rowIndex, colIndex);
      }
    } else {
      for (var colIndex = 0; colIndex < n; colIndex++) {
        board.togglePiece(rowIndex, colIndex);
        if (!board.hasColConflictAt(colIndex)
        && !board.hasMajorDiagonalConflictAt(colIndex - rowIndex)
        && !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)) {
          var newBoard = new Board(board.values().slice(0, -1));
          recursiveSolutionFinder(newBoard, rowIndex + 1);
        }
        board.togglePiece(rowIndex, colIndex);
      }
    }
  };

  recursiveSolutionFinder(testBoard, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
