import { sleep, checkAndAddNode, getCoords, drawShortestPath } from "../utils";

async function dfs(startNode, x, y) {
  let path = [];
  let newNode = startNode;
  let stack = [newNode];
  let parent = new Map(); // keep track of path

  while (!newNode.classList.contains("end") && stack.length !== 0) {
    if (!newNode.isEqualNode(startNode)) newNode.classList.add("visited");

    await sleep(10);
    newNode = stack.pop();
    path.push(newNode);

    [x, y] = getCoords(newNode);

    checkAndAddNode(x, y - 1, stack, parent, newNode, false);
    checkAndAddNode(x + 1, y, stack, parent, newNode, false);
    checkAndAddNode(x, y + 1, stack, parent, newNode, false);
    checkAndAddNode(x - 1, y, stack, parent, newNode, false);
  }
  // draw path
  await drawShortestPath(startNode, newNode, parent);
}

export default dfs;
