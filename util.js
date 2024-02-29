// function getMove(player, board) {
//   // TODO: Determine valid moves
//   // TODO: Determine best move
//   return [2, 3];
// }
//Main function to get the next best move for the player
function getMove(player, board) {
  const validMoves = findValidMoves(player, board); //Get all valid moves for the player
  return selectBestMove(validMoves); //here we select the best move from the valid moves
}

// checking 2 strategic moves in this game (to the corners or the edges)
// first streategic move is to check if (move) is a corner, it will return true, if it matches any of the corners..
// I have a constant move coming from client.This is an array for the position on the game board(row and column indices)
// function to check if a move is at a corner of the board
function isCornerMove(move) {
  const corners = [
    // array of arrays defining the 4 corners in my board
    [0, 0],
    [0, 7],
    [7, 0],
    [7, 7],
  ];
  // iteration loop over the corners array to check if my moves matches any corner position
  for (let i = 0; i < corners.length; i++) {
    // move[0]-row & move[1]-column, anything on the first and last row and on the first and last column is going to be the edge of the board and return true
    if (move[0] === corners[i][0] && move[1] === corners[i][1]) {
      return true; //the move is a corner move
    }
  }
  return false; //the move is Not a corner move
}

// second strategic move is checking edges, checking the edges, getting them offers less posibilities for the oponent to atack

function isEdgeMove(move) {
  // Check if the move is on the first or last row, or the first or last column
  return move[0] === 0 || move[0] === 7 || move[1] === 0 || move[1] === 7;
}

//function to check if putting a piece at a certain position is a valid move for the player
function isValidMove(player, board, row, col) {
  //If the cell is occupied return false
  if (board[row][col] !== 0) return false;
  //ternary operator que identifica the oponent's piece value if player 1 is true the oponent is the "2" sino is the actual "1"
  const opponent = player === 1 ? 2 : 1;
  //this is an array for all the possible directions vertical, horizontal, diagonals, [row mov, vert move]
  const directions = [
    [-1, -1],
    [1, 1], // Diagonals
    [-1, 1],
    [1, -1],
    [-1, 0],
    [1, 0], // Vertical
    [0, -1],
    [0, 1], // Horizontal
  ];
  //check all directions for catching an oponent's piece
  //starts a loop through directions
  for (let i = 0; i < directions.length; i++) {
    let x = row + directions[i][0];
    let y = col + directions[i][1];
    //boolean set to false I am just looking in a new direction for a specific cell, no oponent piece to find yet
    let foundOpponent = false;
    //loop in the direction while oponent pieces are found
    while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
      foundOpponent = true;
      x += directions[i][0];
      y += directions[i][1];
    }
    //A valid move is found if an opponent's piece is surrounded by the player's pieces
    if (
      foundOpponent &&
      x >= 0 &&
      x < 8 &&
      y >= 0 &&
      y < 8 &&
      board[x][y] === player
    ) {
      return true;
    }
  }
  return false; //no valid move found
}

function findValidMoves(player, board) {
  let validMoves = [];
  // Iterate through the board to find all moves that are valid
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (isValidMove(player, board, row, col)) {
        validMoves.push([row, col]); // Add the valid move to the list
      }
    }
  }
  return validMoves; // Return the list of all valid moves
}

// Selects the best move from the list of valid moves
function selectBestMove(validMoves) {
  // first corner moves as they are more strategic
  let cornerMoves = validMoves.filter(isCornerMove);
  if (cornerMoves.length > 0) {
    return cornerMoves[0]; // Return the first corner move if available
  }

  // after corners check the edge moves so the opponent has fewer opportunities to attack
  let edgeMoves = validMoves.filter(isEdgeMove);
  if (edgeMoves.length > 0) {
    return edgeMoves[0]; // Return the first edge move if available
  }

  // return the first valid move available
  return validMoves[0];
}

//This is the original function that I am using, it prepares the response to be sent back to the server with the selected move
function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`; //convert the move to a JSON string with a newline
  console.log(`Sending response ${response}`);
  return response; //return the formatted response
}

//Export the functions for use in other parts of the application
module.exports = { getMove, prepareResponse };
