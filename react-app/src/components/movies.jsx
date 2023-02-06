import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getMovies, deleteMovie } from "./../services/movieService";
import { getGenres } from "./../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import { toast } from "react-toastify";
import ListGroup from "./common/list";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genre" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDeleteMovie = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      toast("Movie deleted successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("ex");
      toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleOnSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1, selectedGenre: null });
  };

  getPagedData = () => {
    const {
      genres,
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      genres,
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const { length: count } = this.state.movies;

    if (count === 0)
      return <p className='mt-3'>There are no movies in the database.</p>;

    const { totalCount, data } = this.getPagedData();
    const { user } = this.props;

    return (
      <div className='py-5 container'>
        <div className='row mt-lg-5'>
          <div className='col-md-3'>
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className='col-md-9'>
            {user && (
              <Link to='/movies/new' className='btn btn-primary mb-2'>
                New Movie
              </Link>
            )}

            <SearchBox value={searchQuery} onChange={this.handleSearch} />

            <p>There are {totalCount} movies in the list.</p>
            <MoviesTable
              onSort={this.handleOnSort}
              movies={data}
              sortColumn={sortColumn}
              onLiked={this.handleLike}
              onDelete={this.handleDeleteMovie}
            />
            <Pagination
              totalItemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
