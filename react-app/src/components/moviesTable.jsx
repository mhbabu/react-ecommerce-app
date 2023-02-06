import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends React.Component {
  columns = [
    {
      path: "title",
      title: "Title",
      content: (movie) => <Link to={`${movie._id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", title: "Genre" },
    { path: "numberInStock", title: "Stock" },
    { path: "dailyRentalRate", title: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLiked={() => this.props.onLiked(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          type='button'
          className='btn btn-danger'
          title='Delete'
          onClick={() => this.props.onDelete(movie)}
        >
          <i className='fa fa-trash'></i>
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
