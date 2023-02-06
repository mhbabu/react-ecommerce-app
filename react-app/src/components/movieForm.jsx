import React from "react";
import { withParamsAndNavigate } from "../utils/getParamsAndNavigate.js";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(5).max(255).required().label("Title"),
    genreId: Joi.required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    const { params, navigate } = this.props;
    try {
      const movieId = params.movieId;
      if (movieId === "new") return null;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) navigate("/not-found");
    }
  }

  async componentDidMount() {
    this.populateGenre();
    this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.navigate("/");
  };

  render() {
    return (
      <div className='mt-5 py-5'>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-md-8'>
              <h1>Movie Form</h1>
              {this.renderInput("title", "Title")}
              {this.renderSelect(
                "genreId",
                "Genre",
                this.state.genres,
                "Select Genre"
              )}
              {this.renderInput("numberInStock", "Number In Stock", "number")}
              {this.renderInput(
                "dailyRentalRate",
                "Daily Rental Rate",
                "number"
              )}
            </div>
            <div className='col-md-8'>
              <div className='mb-3'>{this.renderButton("Save")}</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withParamsAndNavigate(MovieForm);
