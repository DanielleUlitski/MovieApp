import React, { Component } from 'react';
import Movie from './Movie'

class Movies extends Component {

    renderMovies = () => {
        if (this.props.error) return this.renderError();
        if (!this.props.movies) return;
        return this.props.movies.map((i) => {
            return <Movie key={i.imdbID} movie={i} />
        })
    }

    renderError = () => {
        if(this.props.error.message === "Too many results.") {
            return <div className="error2">{this.props.error.message} Please try to use the full title</div>
        } else {
            return <div className="error2">{this.props.error.message}</div>
        }
    }

    render() {
        console.log(this.props.movies)
        return (
            <div className="movies">
                {this.renderMovies()}
            </div>
        );
    }
}

export default Movies;