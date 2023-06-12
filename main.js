class Knight {
  constructor(pos) {
    this.pos = pos;
  }

  getPos() {
    return this.pos;
  }

  checkMove(position) {
    return position[0] < 0 ||
      position[0] > 7 ||
      position[1] < 0 ||
      position[1] > 7
      ? false
      : true;
  }

  getMoves() {
    const possibleMoves = [
      // [-2, +1]
      // [-1, +2]
      [this.pos[0] - 2, this.pos[1] + 1],
      [this.pos[0] - 1, this.pos[1] + 2],

      // [+1, +2]
      // [+2, +1]
      [this.pos[0] + 1, this.pos[1] + 2],
      [this.pos[0] + 2, this.pos[1] + 1],

      // [-2, -1]
      // [-1, -2]
      [this.pos[0] - 2, this.pos[1] - 1],
      [this.pos[0] - 1, this.pos[1] - 2],

      // [+2, -1]
      // [+1, -2]
      [this.pos[0] + 2, this.pos[1] - 1],
      [this.pos[0] + 1, this.pos[1] - 2],
    ];

    possibleMoves.forEach((move) => console.log(move, this.checkMove(move)));
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

const renderGameboard = () => {
  const gamebaordArr = createGameboard();
  const gamebaordElem = document.querySelector("#gameboardElem");

  gamebaordElem.innerHTML = "";

  let count = 0;

  gamebaordArr.forEach((field) => {
    const fieldElem = document.createElement("div");
    fieldElem.classList.add("field-elem");

    // position number
    fieldElem.innerText = field;

    // field color
    if (checkColor(field))
      fieldElem.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    else fieldElem.style.backgroundColor = "rgba(0, 0, 0, 0.9)";

    gamebaordElem.appendChild(fieldElem);
    count++;
  });
};
renderGameboard();

const gameboardArr = createGameboard();

const knightPiece = new Knight([0, 0]);

console.log(knightPiece.getMoves());
