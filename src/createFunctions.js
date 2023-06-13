const checkColor = (position) => {
  return (position[0] + position[1]) % 2 === 0;
};

export const createGameboard = () => {
  let gameboardArr = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      gameboardArr.push([i, j]);
    }
  }

  return gameboardArr;
};

export const createField = (field) => {
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
