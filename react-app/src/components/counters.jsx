import React from "react";
import Counter from "./counter";

class Counters extends React.Component {
  render() {
    const { onReset, onIncrement, onDecrement, onDelete, counters } =
      this.props;
    return (
      <React.Fragment>
        <div onClick={onReset} className='btn btn-small btn-danger m-2'>
          Reset
        </div>
        <br />
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            onReset={onReset}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
            counter={counter}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
