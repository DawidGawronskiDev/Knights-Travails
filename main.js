class King {
  constructor(pos) {
    this.pos = pos;
  }

  getPos() {
    return this.pos;
  }
}

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
      renderPossibleMoves(this);
      renderKing(kingPiece);
      renderKnight(this);

      return;
    }

    return "Can't Move!";
  }

  knightsTravails(target) {
    const queue = [[this.pos]];
    const visited = new Set();

    while (queue.length > 0) {
      const path = queue.shift();
      const currentPosition = path[path.length - 1];

      if (
        currentPosition[0] === target[0] &&
        currentPosition[1] === target[1]
      ) {
        return path;
      }

      if (!visited.has(currentPosition.toString())) {
        visited.add(currentPosition.toString());

        const possibleMoves = this.getMoves(currentPosition);

        possibleMoves.forEach((move) => {
          const newPath = [...path, move];
          queue.push(newPath);
        });
      }
    }
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

  // fieldElem.addEventListener("click", (e) => {
  //   const move = [];
  //   move.push(Number(e.target.dataset.pos[0]));
  //   move.push(Number(e.target.dataset.pos[2]));

  //   return knightPiece.knightMoves(move);
  // });

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

const renderKing = (king) => {
  const kingPos = king.getPos();

  const kingField = document.querySelector(
    `.field-elem[data-pos="${kingPos[0]},${kingPos[1]}"]`
  );

  kingField.dataset.piece = "king";
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

const renderKnightTravails = (path) => {
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      knightPiece.knightMoves(path[i]);
    }, i * 2000);
  }
};

let placeKingBoolean = false;
let placeKnightBoolean = false;

let isKing = false;
let isKnight = false;

let knightPiece;
let kingPiece;

const mouseTracker = document.querySelector("#mouseTracker");
window.addEventListener("mousemove", (e) => {
  const x = e.x + 8;
  const y = e.y + 8;
  mouseTracker.style.left = `${x}px`;
  mouseTracker.style.top = `${y}px`;
});

const placeKingBtn = document.querySelector("#placeKingBtn");
placeKingBtn.addEventListener("click", () => {
  placeKingBoolean = true;
  mouseTracker.dataset.piece = "king";
});

const placeKnightBtn = document.querySelector("#placeKnightBtn");
placeKnightBtn.addEventListener("click", () => {
  placeKnightBoolean = true;
  mouseTracker.dataset.piece = "knight";
});

renderGameboard();
renderGameboard();

Array.from(document.querySelectorAll(".field-elem")).forEach((field) => {
  field.addEventListener("click", (e) => {
    if (placeKingBoolean && !isKing) {
      placeKnightBoolean = false;

      const kingPos = [
        Number(e.target.dataset.pos[0]),
        Number(e.target.dataset.pos[2]),
      ];
      kingPiece = new King(kingPos);

      renderKing(kingPiece);

      mouseTracker.dataset.piece = "";
      placeKingBoolean = false;
      isKing = true;
    }

    if (placeKnightBoolean && !isKnight) {
      placeKingBoolean = false;

      const knightPos = [
        Number(e.target.dataset.pos[0]),
        Number(e.target.dataset.pos[2]),
      ];
      knightPiece = new Knight(knightPos);

      renderKnight(knightPiece);

      mouseTracker.dataset.piece = "";
      placeKnightBoolean = false;
      isKnight = true;
    }
  });
});

document.querySelector("#startBtn").addEventListener("click", () => {
  init();
});

const init = () => {
  if (!isKing || !isKnight) return;

  renderPossibleMoves(knightPiece);
  knightPiece.knightsTravails(kingPiece.getPos());
  renderKnightTravails(knightPiece.knightsTravails(kingPiece.getPos()));
};
