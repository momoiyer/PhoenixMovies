import React from 'react';
import Joi from 'joi-browser'
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService.js';
import { saveMovie, getMovie } from '../services/fakeMovieService.js';

class MovieForm extends Form {
    state = {
        data: { _id:'', title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
        genres: [],
        errors: {}
    };    

    schema = {
        _id: Joi.string().allow(null).allow(''),        
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')
    };

    componentDidMount() {
        this.setState({ genres: getGenres() });     

        const currentMovie = this.props.match.params.id;
        if (currentMovie)
        {
            const movie = getMovie(currentMovie);
            if (!movie) return this.props.history.replace("/not-found");
            this.setState({ data: this.mapToViewModel(movie) });
        }        
    }
    
    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit = () => {
        saveMovie(this.state.data);
        return this.props.history.push("/movies");
    }

    render() { 
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title","Title")}  
                    {this.renderSelect(this.state.genres,"genreId","Genre")}
                    {this.renderInput("numberInStock","Number in Stock", "number")}  
                    {this.renderInput("dailyRentalRate","Rate", "number")}  
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}
 
export default MovieForm;