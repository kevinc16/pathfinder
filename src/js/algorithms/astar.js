import { colCount, rowCount } from "../constants";
import {
  sleep,
  getCoords,
  drawShortestPath,
  getNode,
  isInBounds,
  getStartNode,
  getEndNode,
} from "../utils";
import { PriorityQueue } from "./minQueue";

function getDistance(oldNode, newNode) {
  return 1;
}

function h(node) {
  let end = getEndNode();
  let [endX, endY] = getCoords(end);
  let [x, y] = getCoords(node);
  return Math.abs(x - endX) + Math.abs(y - endY); // manhattan distance
}

export async function astar(startNode, x, y) {
  let newNode = startNode;
  let knownNodes = new PriorityQueue();
  knownNodes.enqueue(newNode, 0);

  let dist = new Map();
  let guess = new Map();
  for (let x = 0; x < colCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      dist.set(getNode(x, y), Number.MAX_VALUE);
      guess.set(getNode(x, y), Number.MAX_VALUE);
      // minQueue.enqueue(getNode(x, y), getDistance());
      if (getNode(x, y).isEqualNode(startNode)) {
        dist.set(getNode(x, y), 0);
        guess.set(getNode(x, y), h(startNode));
      }
    }
  }
  let visited = new Set();
  let parent = new Map(); // keep track of path

  function checkAndAddNode(oldNode, newX, newY) {
    let newNode = getNode(newX, newY);
    if (!isInBounds(newX, newY) || newNode.classList.contains("wall")) return;

    if (dist.get(oldNode) + getDistance() < dist.get(newNode)) {
      dist.set(newNode, dist.get(oldNode) + getDistance(oldNode, newNode));
      parent.set(newNode, oldNode);
      guess.set(newNode, dist.get(newNode) + h(newNode)); // by heuristic
      if (!knownNodes.includes(newNode))
        knownNodes.enqueue(newNode, guess.get(newNode));
    }
  }

  while (!newNode.classList.contains("end") && !knownNodes.isEmpty()) {
    await sleep(10);
    newNode = knownNodes.dequeue().element;
    if (!newNode.isEqualNode(startNode) && !newNode.classList.contains("end"))
      newNode.classList.add("visited");
    [x, y] = getCoords(newNode);

    checkAndAddNode(newNode, x, y - 1);
    checkAndAddNode(newNode, x - 1, y);
    checkAndAddNode(newNode, x, y + 1);
    checkAndAddNode(newNode, x + 1, y);
  }
  // draw path
  // console.log(dist);
  await drawShortestPath(startNode, newNode, parent);
}

export default astar;
