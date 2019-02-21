import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div className="error" style={(this.props.display) ? { display: "inline-block" } : { display: "none" }}>Movie title can't be empty!</div>
        );
    }
}

export default Error;