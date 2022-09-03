import Node from "./Node/Node";
import React from "react";
import "./PathfindingVisualizer.css";

class PathfindingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = this.grid();
    this.setState({ grid });
  }

  grid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const crow = [];
      for (let col = 0; col < 30; col++) {
        const cnode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 10,
        };
        crow.push(cnode);
      }
      grid.push(crow);
    }
    return grid;
  }

  render() {
    const { grid } = this.state;

    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isFinish, isStart } = node;
                return (
                  <Node
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
    );
  }
}

export default PathfindingVisualizer;
