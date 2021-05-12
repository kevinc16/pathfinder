import { colCount, rowCount } from "../constants";
import {
  sleep,
  getCoords,
  drawShortestPath,
  getNode,
  isInBounds,
  getStartNode,
} from "../utils";
import { PriorityQueue } from "./minQueue";

function getDistance(oldNode, newNode) { // used if the graph was weighted
  return 1;
}

// dijkstra is same as bfs if unweighted
export async function dijkstra(startNode, x, y) {
  let newNode = startNode;
  let minQueue = new PriorityQueue();
  minQueue.enqueue(newNode, 0);
  let dist = new Map();
  for (let x = 0; x < colCount; x++) { // init to inf for all but start
    for (let y = 0; y < rowCount; y++) {
      dist.set(getNode(x, y), Number.MAX_VALUE);
      // minQueue.enqueue(getNode(x, y), getDistance());
      if (getNode(x, y).isEqualNode(startNode)) dist.set(getNode(x, y), 0);
    }
  }
  let visited = new Set();
  let parent = new Map(); // keep track of path

  function checkAndAddNode(oldNode, newX, newY) {
    let newNode = getNode(newX, newY);
    if (!isInBounds(newX, newY) || newNode.classList.contains("wall")) return;
    if (dist.get(oldNode) + getDistance() < dist.get(newNode)) { // this is a better path to this node, save it
      dist.set(newNode, dist.get(oldNode) + 1);
      parent.set(newNode, oldNode);
      minQueue.enqueue(newNode, dist.get(oldNode) + 1);
    }
  }

  while (!newNode.classList.contains("end") && !minQueue.isEmpty()) {
    await sleep(10);
    newNode = minQueue.dequeue().element; // takes the shortest route every iteration
    if (!visited.has(newNode.id)) {
      visited.add(newNode.id);
      if (!newNode.isEqualNode(startNode) && !newNode.classList.contains("end"))
        newNode.classList.add("visited");
    }
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

export default dijkstra;
