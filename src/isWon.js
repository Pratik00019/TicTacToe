const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const isWon = (board) => {
    var flag =0
  winningPatterns.forEach((pattern) => {

    if (
      board[pattern[0]] === board[pattern[1]] &&
      board[pattern[2]] === board[pattern[1]] && board[pattern[0]] && board[pattern[1]]
    )
      flag=1;
  });

  if(flag===1)
    return true
  return false;

};
export default isWon;
