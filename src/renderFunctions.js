import { createGameboard } from "./createFunctions";
import { createField } from "./createFunctions";

export const renderGameboard = () => {
  const gamebaordArr = createGameboard();
  const gamebaordElem = document.querySelector("#gameboardElem");

  gamebaordElem.innerHTML = "";

  gamebaordArr.forEach((field) => {
    gamebaordElem.appendChild(createField(field));
  });
};

export const renderKnight = (knight) => {
  const knightPos = knight.getPos();

  const knightField = document.querySelector(
    `.field-elem[data-pos="${knightPos[0]},${knightPos[1]}"]`
  );

  knightField.dataset.piece = "knight";
  return;
};

export const renderKing = (king) => {
  const kingPos = king.getPos();

  const kingField = document.querySelector(
    `.field-elem[data-pos="${kingPos[0]},${kingPos[1]}"]`
  );

  kingField.dataset.piece = "king";
  return;
};

export const renderPossibleMoves = (knight) => {
  const possibleMoves = knight.getMoves();

  possibleMoves.forEach((move) => {
    const possibleField = document.querySelector(
      `.field-elem[data-pos="${move[0]},${move[1]}"]`
    );

    possibleField.dataset.possmove = true;
  });

  return possibleMoves;
};
