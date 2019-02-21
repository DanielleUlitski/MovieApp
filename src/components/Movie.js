import React, { Component } from 'react';
import Axios from 'axios';

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullData: {}
        }
    }

    componentDidMount() {
        Axios.get(`http://www.omdbapi.com/?apikey=9394bd62&i=${this.props.movie.imdbID}&plot=full`)
            .then((res) => {
                this.setState({ fullData: res.data });
            })
            .catch((err) => {
                console.error(err);
            })
    }

    renderLink = () => {
        if (this.state.fullData.Website) {
            return (<a href={this.state.fullData.Website} >Website</a>)
        }
    }

    render() {
        return (
            <div className="movie-card">
                <h4>{this.state.fullData.Title}</h4>
                <img src={this.state.fullData.Poster} alt="Poster not Found" />
                <span>Rating: {this.state.fullData.imdbRating}</span>
                <span>Votes: {this.state.fullData.imdbVotes}</span>
                <span>Release Year: {this.state.fullData.Year}</span>
                <span>Length: {this.state.fullData.Runtime}</span>
                <span>Country: {this.state.fullData.Country}</span>
                <span>Actors: {this.state.fullData.Actors}</span>
                <span>Director: {this.state.fullData.Director}</span>
                <p>Plot: {this.state.fullData.Plot}</p>
                {this.renderLink()}
            </div>
        );
    }
}

export default Movie;