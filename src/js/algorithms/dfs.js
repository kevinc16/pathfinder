import { sleep, checkAndAddNode, getCoords } from "../utils";

async function dfs(startNode, x, y) {
  let path = [];
  let newNode = startNode;
  let stack = [newNode];

  while (!newNode.classList.contains("end") && stack.length !== 0) {
    if (!newNode.isEqualNode(startNode)) newNode.classList.add("visited");
    
    await sleep(10);
    newNode = stack.pop();
    path.push(newNode);

    [x, y] = getCoords(newNode);

    checkAndAddNode(x, y - 1, stack);
    checkAndAddNode(x + 1, y, stack);
    checkAndAddNode(x, y + 1, stack);
    checkAndAddNode(x - 1, y, stack);
  }
  // draw path
  for (let i = 0; i < path.length; i++) {
    let ele = path[i];
    await sleep(20);
    ele.classList.remove("visited");
    ele.classList.add("path");
  }
}

export default dfs;
