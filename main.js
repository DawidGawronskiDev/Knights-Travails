class Knight {
  constructor(pos) {
    this.pos = pos;
  }

  getPos() {
    return this.pos;
  }

  _checkMove(position) {
    return position[0] < 0 ||
      position[0] > 7 ||
      position[1] < 0 ||
      position[1] > 7
      ? false
      : true;
  }

  getMoves(position = this.pos) {
    const allMoves = [
      // [-2, +1]
      // [-1, +2]
      [position[0] - 2, position[1] + 1],
      [position[0] - 1, position[1] + 2],

      // [+1, +2]
      // [+2, +1]
      [position[0] + 1, position[1] + 2],
      [position[0] + 2, position[1] + 1],

      // [-2, -1]
      // [-1, -2]
      [position[0] - 2, position[1] - 1],
      [position[0] - 1, position[1] - 2],

      // [+2, -1]
      // [+1, -2]
      [position[0] + 2, position[1] - 1],
      [position[0] + 1, position[1] - 2],
    ];

    const possibleMoves = [];

    allMoves.forEach((move) => {
      if (this._checkMove(move)) possibleMoves.push(move);
    });

    return possibleMoves;
  }

  _checkPossibleMove(possibleMoves, position) {
    return possibleMoves.find(
      (move) => move[0] === position[0] && move[1] === position[1]
    )
      ? true
      : false;
  }

  knightMoves(position) {
    const possibleMoves = this.getMoves();

    // if move is possible
    if (this._checkPossibleMove(possibleMoves, position)) {
      this.pos = position;

      createGameboard();
      renderGameboard();
      renderKnight(this);
      renderPossibleMoves(this);

      return;
    }

    return "Can't Move!";
  }
}

const createGameboard = () => {
  let gameboardArr = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      gameboardArr.push([i, j]);
    }
  }

  return gameboardArr;
};

const checkColor = (position) => {
  return (position[0] + position[1]) % 2 === 0;
};

const bindFieldEventListener = (field) => {
  return field;
};

const createField = (field) => {
  const fieldElem = document.createElement("div");
  fieldElem.dataset.possmove = false;
  fieldElem.dataset.piece = null;
  fieldElem.dataset.pos = field;
  fieldElem.classList.add("field-elem");

  // position number
  fieldElem.innerText = field;

  // field color
  if (checkColor(field)) fieldElem.dataset.odd = true;
  else fieldElem.dataset.odd = false;

  fieldElem.addEventListener("click", (e) => {
    const move = [];
    move.push(Number(e.target.dataset.pos[0]));
    move.push(Number(e.target.dataset.pos[2]));

    return knightPiece.knightMoves(move);
  });

  return fieldElem;
};

const renderGameboard = () => {
  const gamebaordArr = createGameboard();
  const gamebaordElem = document.querySelector("#gameboardElem");

  gamebaordElem.innerHTML = "";

  gamebaordArr.forEach((field) => {
    gamebaordElem.appendChild(createField(field));
  });
};

const renderKnight = (knight) => {
  const knightPos = knight.getPos();

  const knightField = document.querySelector(
    `.field-elem[data-pos="${knightPos[0]},${knightPos[1]}"]`
  );

  knightField.dataset.piece = "knight";
  return;
};

const renderPossibleMoves = (knight) => {
  const possibleMoves = knight.getMoves();

  possibleMoves.forEach((move) => {
    const possibleField = document.querySelector(
      `.field-elem[data-pos="${move[0]},${move[1]}"]`
    );

    possibleField.dataset.possmove = true;
  });

  return possibleMoves;
};

createGameboard();
const knightPiece = new Knight([6, 5]);

renderGameboard();
renderKnight(knightPiece);

console.log(renderPossibleMoves(knightPiece));

console.log(knightPiece.knightMoves([4, 4]));
