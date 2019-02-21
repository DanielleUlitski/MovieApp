import React, { Component } from 'react';
import Button from './Button';

class Pagination extends Component {
    render() {
        return (
            <div className="pagination" style={(this.props.lastP) ? { display: "block" } : { display: "none" }}>
                <Button class="pagination-btn" name="<<" click={this.props.firstPage} />
                <Button class="pagination-btn" name="<" click={this.props.previousPage} />
                <span>1 - {this.props.page} - {this.props.lastP}</span>
                <Button class="pagination-btn" name=">" click={this.props.nextPage} />
                <Button class="pagination-btn" name=">>" click={this.props.lastPage} />
            </div>
        );
    }
}

export default Pagination;