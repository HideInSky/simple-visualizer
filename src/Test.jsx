import React from "react";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const test1 = Infinity === Math.pow(10, 1000);
    return (
      <div>
        <h1>{test1.toString()}</h1>
      </div>
    );
  }
}

export default Test;
