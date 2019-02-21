import React, { Component } from 'react';

class Input extends Component {

    update = (e) => {
        this.props.update(e.target.id, e.target.value);
    }

    render() {
        //dynamic input to handle movie year or movie title
        let titleInput = this.props.info === "movie";
        let currentYear = new Date().getFullYear().toString();
        return (
            <input placeholder={titleInput ? "Movie title" : "1888 - " + currentYear}
                type={titleInput ? "string" : "number"}
                className="input" id={this.props.info} value={this.props.val}
                onChange={this.update} step="1" min="1888" max={currentYear}
            />
        );
    }
}

export default Input;