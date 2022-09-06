export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid); // get a grid copy
  // array of nodes, 1 row 1->r, 2 row, 3...
  // each node contains a dict of different properties.

  while (!!unvisitedNodes.length) {
    // 1. get nearest neighbors from unvisited nodes
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // check : if wall, skip the node;
    if (closestNode.isWall) continue;
    // ?????
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    // 2. set nearest neighbor as visited, and push it into vistedOrder
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // 3. return shortest path if reaching finishNode
    if (closestNode === finishNode) return visitedNodesInOrder;

    // 4. update neighbor distance
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function getNodesInShortestPathOrder(finishNode) {
  const shortestPath = [];
  let node = finishNode;
  while (node !== null) {
    console.log(node);
    shortestPath.unshift(node);
    node = node.previousNode;
  }

  return shortestPath;
}
