import { rowCount, colCount } from "./constants";
import dfs from "./algorithms/dfs";
import bfs from "./algorithms/bfs";

let algo = null;

function clearGrid() {
  for (let y = 0; y < rowCount; y++) {
    let row = document.getElementById(`row ${y}`);
    row.childNodes.forEach((element) => {
      if (element.classList.contains("start"))
        element.className = "grid-item start";
      else if (element.classList.contains("end"))
        element.className = "grid-item end";
      else if (element.classList.contains("wall"))
        element.className = "grid-item wall";
      else element.className = "grid-item";
    });
  }
}

function clearWalls() {
  for (let y = 0; y < rowCount; y++) {
    let row = document.getElementById(`row ${y}`);
    row.childNodes.forEach((element) => {
      if (element.classList.contains("wall")) element.className = "grid-item";
    });
  }
}

function endSearch() {
  let startNode = getStartNode();
  startNode.classList.remove("visited");
}

export function hasStarted() {
  let startNode = Array.from(
    document.getElementsByClassName("grid-item start")
  )[0];
  if (startNode.classList.contains("visited")) {
    return true;
  } else {
    return false;
  }
}

export function disableButtons() {
  let navbar = document.getElementById("navbar");
  let ele = Array.from(navbar.getElementsByTagName("a"));
  ele.forEach((element) => {
    element.classList.add("disabled");
  });
}

export function enableButtons() {
  let navbar = document.getElementById("navbar");
  let ele = Array.from(navbar.getElementsByTagName("a"));
  ele.forEach((element) => {
    element.classList.remove("disabled");
  });
}

export function getStartNode() {
  return Array.from(document.getElementsByClassName("grid-item start"))[0];
}

export function getEndNode() {
  return Array.from(document.getElementsByClassName("grid-item end"))[0];
}

export function initializeButtons() {
  let dropdownBtn = document.getElementById("navbarDropdownMenuLink");
  let arr = Array.from(document.getElementsByClassName("dropdown-item"));
  arr.forEach((element) => {
    element.onclick = () => {
      dropdownBtn.innerHTML = element.innerHTML;
      if (element.innerHTML.includes("Breadth")) {
        algo = "bfs";
      }
      if (element.innerHTML.includes("Depth")) {
        algo = "dfs";
      }
      if (element.innerHTML.includes("A*")) {
        algo = "astar";
      }
      if (element.innerHTML.includes("Dij")) {
        algo = "dijkstras";
      }
    };
  });

  let clearBtn = document.getElementById("clear-button");
  clearBtn.onclick = clearGrid;

  let startButton = document.getElementById("start-button");
  startButton.onclick = async () => {
    let startNode = getStartNode();

    let x, y;
    [x, y] = getCoords(startNode);

    disableButtons();
    clearGrid();
    if (algo === "bfs") {
      await bfs(startNode, x, y);
    } else if (algo === "dfs") {
      await dfs(startNode, x, y);
    } else {
      alert("Choose an algorithm to start");
    }
    enableButtons();
    endSearch();
  };

  let clearWallBtn = document.getElementById("clearwall-button");
  clearWallBtn.onclick = clearWalls;
}

export function cellBlocked(x, y) {
  let bounded = false;
  if (y >= 0 && y < rowCount && x < colCount && x >= 0) {
    bounded = true;
  }

  let node = document.getElementById(`${x}-${y}`);
  if (
    !bounded ||
    node.classList.contains("visited") ||
    node.classList.contains("wall")
  ) {
    return null;
  } else {
    return node;
  }
}

export function checkAndAddNode(x, y, arr, parent = null, oldNode = null) {
  let tempNode = cellBlocked(x, y);
  if (tempNode) {
    if (arr.includes(tempNode)) {
      return;
    }
    if (parent) parent.set(tempNode, oldNode);
    arr.push(tempNode);
  }
}

export function getCoords(node) {
  let x = Number(node.id.split("-")[0]);
  let y = Number(node.id.split("-")[1]);
  return [x, y];
}

export async function drawShortestPath(startNode, endNode, parent) {
  let p = parent.get(endNode);
  while (p) {
    // backtracking
    if (p.isEqualNode(startNode)) break;
    await sleep(20);
    p.classList.add("path");
    p = parent.get(p);
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
