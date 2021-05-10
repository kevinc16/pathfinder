import { rowCount, colCount } from "./constants";
import { hasStarted, getStartNode, getEndNode } from "./utils";

let leftMouseButtonDown = false;
let rightMouseButtonDown = false;

function setButtonState(e) {
  e.preventDefault();
  leftMouseButtonDown =
    e.buttons === undefined ? e.which === 1 : e.buttons === 1;
  rightMouseButtonDown =
    e.buttons === undefined ? e.which === 2 : e.buttons === 2;
}

document.body.onmousedown = setButtonState;
document.body.onmousemove = setButtonState;
document.body.onmouseup = setButtonState;

let board = document.getElementById("board-body");

function addWall(event) {
  if (
    !event.target.classList.contains("start") &&
    !event.target.classList.contains("end") &&
    !hasStarted()
  ) {
    event.target.classList.add("wall");
  }
}

function removeWall(event) {
  if (!hasStarted()) {
    event.target.classList.remove("wall");
  }
}

let moveStart = false;
let moveEnd = false;

function addCellEvents(cell) {
  cell.onmousedown = () => {
    if (cell.classList.contains("start")) moveStart = true;
    else if (cell.classList.contains("end")) moveEnd = true;
  };
  cell.onmouseup = () => {
    if (cell.classList.contains("start")) moveStart = false;
    else if (cell.classList.contains("end")) moveEnd = false;
  };
  cell.onmousemove = (event) => {
    if (leftMouseButtonDown) {
      if (moveStart && !event.target.classList.contains("wall")) {
        let start = getStartNode();
        start.classList.remove("start");
        cell.classList.add("start");
      } else if (moveEnd && !event.target.classList.contains("wall")) {
        let end = getEndNode();
        end.classList.remove("end");
        cell.classList.add("end");
      } else addWall(event);
    } else if (rightMouseButtonDown) {
      removeWall(event);
    }
  };
  cell.oncontextmenu = (event) => {
    event.preventDefault();
    removeWall(event);
  };
  cell.onclick = (event) => {
    event.preventDefault();
    addWall(event);
  };
}

function drawGrids() {
  for (let y = 0; y < rowCount; y++) {
    let row = document.createElement("tr");
    row.id = `row ${y}`;
    for (let x = 0; x < colCount; x++) {
      let cell = document.createElement("td");
      cell.className = "grid-item";
      cell.id = `${x}-${y}`;

      if (x === 2 && y === 2) {
        cell.classList.add("start");
      } else if (x === colCount - 3 && y === rowCount - 3) {
        cell.classList.add("end");
      }
      addCellEvents(cell);

      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

export default drawGrids;
