
export function dijkstra (grid, startNode, finishNode){

    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid); // get a grid copy
    // array of nodes, 1 row 1->r, 2 row, 3...
    // each node contains a dict of different properties.
    
    while (!!unvisitedNodes.length){
        // 1. get nearest neighbors from unvisited nodes
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        // check : if wall, skip the node;
        if (closestNode.isWall) continue;
        // check : if infinity, all nodes are reached, return shortest path;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        // 2. set nearest neighbor as visited, and push it into vistedOrder
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        // 3. 
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function updateUnvisitedNeighbors(node, grid){
    
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

function sortNodesByDistance( unvisitedNodes){
    unvisitedNodes.sort( (nodeA, nodeB) => nodeA.distance - nodeB.distance);
      
}

