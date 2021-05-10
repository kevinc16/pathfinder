import { sleep, checkAndAddNode, getCoords, drawShortestPath } from "../utils";

async function bfs(startNode, x, y) {
  let newNode = startNode;
  let queue = [newNode];
  let parent = new Map();

  while (!newNode.classList.contains("end") && queue.length !== 0) {
    if (!newNode.isEqualNode(startNode)) newNode.classList.add("visited");

    await sleep(10);
    newNode = queue.shift();
    [x, y] = getCoords(newNode);

    checkAndAddNode(x, y - 1, queue, parent, newNode);
    checkAndAddNode(x + 1, y, queue, parent, newNode);
    checkAndAddNode(x, y + 1, queue, parent, newNode);
    checkAndAddNode(x - 1, y, queue, parent, newNode);
  }
  // draw path
  await drawShortestPath(startNode, newNode, parent);
}

export default bfs;
