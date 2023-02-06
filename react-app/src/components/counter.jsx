import React from "react";

class Counter extends React.Component {
  render() {
    const { onIncrement, onDecrement, counter, onDelete } = this.props;
    return (
      <React.Fragment>
        <span className={this.getBadgeClasees()}>{this.formatCount()}</span>
        <button
          className='btn btn-primary btn-sm mr-1'
          onClick={() => onIncrement(counter)}
        >
          <i className='fa fa-plus-circle' />
        </button>

        <button
          className='btn btn-danger btn-sm'
          onClick={() => onDecrement(counter)}
          disabled={!counter.value}
        >
          <i className='fa fa-minus-circle' />
        </button>
        <button
          className='btn btn-danger btn-sm ml-2'
          onClick={() => onDelete(counter)}
        >
          Delete
        </button>
        <br />
      </React.Fragment>
    );
  }

  getBadgeClasees() {
    const { counter } = this.props;
    let classes = "ml-3 mt-3 mr-2 badge badge-";
    classes += counter.value > 0 ? "primary" : "warning";
    return classes;
  }

  formatCount() {
    const { counter } = this.props;
    return counter.value === 0 ? "Zero" : counter.value;
  }
}

export default Counter;
