import React, { Component } from 'react';
import Input from './Input';
import Error from './Error';
import Button from './Button';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            display: false,
            movie: "",
            date: ""
        }
    }

    error = (val) => {
        if (val === "") {
            this.setState({ display: true });
        } else if (this.state.display) {
            this.setState({ display: false });
        }
    }

    submit = () => {
        if(this.state.date) this.props.submit(this.state.movie, this.state.date);
        else this.props.submit(this.state.movie, null);
    }

    update = (id, val) => {
        this.setState({ [id]: val }, () => { if (id === "movie") this.error(val) });
    }

    reset = () => {
        this.setState({ display: false, movie: "", date: "" }, this.props.fReset());
    }

    render() {
        return (
            <div className="search">
                <div className="input-group">
                    <Input info="movie" update={this.update} val={this.state.movie} />
                    <Input info="date" update={this.update} val={this.state.date} />
                    <div className="btn-container">
                        <Button class="main" click={this.submit} name="Submit" />
                        <Button class="main" click={this.reset} name="Reset" />
                    </div>
                </div>
                <Error display={this.state.display} />
            </div>
        );
    }
}

export default Search;