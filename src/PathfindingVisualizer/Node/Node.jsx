import "./Node.css";
import React from "react";

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  // componentWillUnmount() {

  // }

  render() {
    const { isFinish, isStart, row, col } = this.props;
    const extraName = isFinish ? "node-finish" : isStart ? "node-start" : "";

    return (
      <div id={`node-${row}-${col}`} className={`node ${extraName}`}></div>
    );
  }
}

export default Node;
