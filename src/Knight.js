export default class Knight {
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
