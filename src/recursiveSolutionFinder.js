

let solutionCount = 0;
let calledWorkers = 0;

let recursiveSolutionFinder = function (board, rowIndex) {
  console.log(board);
  let isRow0 = (rowIndex === 0);
  let n = board.attributes['n'];
  let adjustedN = isRow0 ? n / 2 : n;
  for (let colIndex = 0; colIndex < adjustedN; colIndex++) {
    board.togglePiece(rowIndex, colIndex);
    if (!board.hasColConflictAt(colIndex)
    && !board.hasMajorDiagonalConflictAt(colIndex - rowIndex)
    && !board.hasMinorDiagonalConflictAt(colIndex + rowIndex)) {
      if (rowIndex === n - 1) {
        solutionCount++;
      } else {
        let recursiveWorker = new Worker('recursiveSolutionFinder.js');
        recursiveWorker.postMessage(['spawn', board, 0]);
        calledWorkers++;
      }
    }
    board.togglePiece(rowIndex, colIndex);
    if (isRow0 && colIndex === Math.floor(n / 2) - 1) {
      solutionCount = solutionCount * 2;
    }
  }
  if (rowIndex === n - 1) {
    self.postMessage('result', solutionCount);
    self.terminate();
  }
};

self.onmessage = function(message) {
  if (message.data[0] === 'spawn') {
    recursiveSolutionFinder(message.data[1], message.data[2]);
  } else if (message.data[0] === 'result') {
    calledWorkers--;
    solutionCount += message.data[1];
    //self.postMessage('result', solutionCount);
    if (calledWorkers === 0) {
      self.postMessage('result', solutionCount);
      self.terminate();
    }
  }
};