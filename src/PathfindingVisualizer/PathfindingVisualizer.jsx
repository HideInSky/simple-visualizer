import Node from "./Node/Node";
import React from "react";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

class PathfindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  getInitialGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const crow = [];
      for (let col = 0; col < 50; col++) {
        crow.push(this.createNode(row, col));
      }
      grid.push(crow);
    }
    return grid;
  }

  createNode(row, col) {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const { row, col } = node;
        document.getElementById(`node-${row}-${col}`).className =
          "node node-visited";
      }, 2 * i);

      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          for (const node of nodesInShortestPathOrder) {
            const { row, col } = node;
            document.getElementById(`node-${row}-${col}`).className =
              "node node-shortest-path";
          }
        }, 10);
      }
    }
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          visualizeDijkstra
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isFinish, isStart, row, col } = node;
                  return (
                    <Node
                      row={row}
                      col={col}
                      key={nodeIdx}
                      isFinish={isFinish}
                      isStart={isStart}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

// const createNode = (row, col) => {
//   return {
//     row,
//     col,
//     isStart: row === START_NODE_ROW && col === START_NODE_COL,
//     isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//     distance: Infinity,
//     isVisited: false,
//     isWall: false,
//     previousNode: null,
//   };
// };

export default PathfindingVisualizer;
