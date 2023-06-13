import "./style.css";

import King from "./King";
import Knight from "./Knight";

let placeKingBoolean = false;
let placeKnightBoolean = false;

let isKing = false;
let isKnight = false;

let knightPiece;
let kingPiece;

import { renderPossibleMoves } from "./renderFunctions";
import { renderGameboard } from "./renderFunctions";
import { renderKnight } from "./renderFunctions";
import { renderKing } from "./renderFunctions";

renderGameboard();

const renderKnightTravails = (path) => {
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      knightPiece.knightMoves(path[i]);
      renderGameboard();
      renderPossibleMoves(knightPiece);
      renderKing(kingPiece);
      renderKnight(knightPiece);
    }, i * 2000);
  }
};

const mouseTracker = document.querySelector("#mouseTracker");
window.addEventListener("mousemove", (e) => {
  const x = e.x + 8;
  const y = e.y + 8;
  mouseTracker.style.left = `${x}px`;
  mouseTracker.style.top = `${y}px`;
});

const placeKingBtn = document.querySelector("#placeKingBtn");
placeKingBtn.addEventListener("click", () => {
  if (isKing) return;
  placeKingBoolean = true;
  mouseTracker.dataset.piece = "king";
});

const placeKnightBtn = document.querySelector("#placeKnightBtn");
placeKnightBtn.addEventListener("click", () => {
  if (isKnight) return;
  placeKnightBoolean = true;
  mouseTracker.dataset.piece = "knight";
});

const fieldsArr = Array.from(document.querySelectorAll(".field-elem"));
fieldsArr.forEach((field) => {
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
