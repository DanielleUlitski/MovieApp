import React, { Component } from 'react';

class Button extends Component {
    //dynamic Button component for reuse with any button ever needed
    click = () => {
        this.props.click()
    }

    render() {
        return (
            <div className={this.props.class + " btn"} onClick={this.click}>{this.props.name}</div>
        );
    }
}

export default Button;