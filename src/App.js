import React, { Component } from 'react';
import axios from 'axios'
import Movies from './components/Movies';
import "./App.css";
import Search from './components/Search';
import Pagination from './components/Pagination';
class App extends Component {

  constructor() {
    super()
    this.state = {
      data: {},
      s: "",
      y: null,
      page: 1,
      lastP: null,
      error: undefined
    }
  }

  fReset = () => {
    //fReset = full reset (resets the movies to be a blank page)
    this.setState({ data: {}, s: "", y: null, page: 1, lastP: null, error: undefined });
  }

  search = (movieTitle, date) => {
    if (this.state.error) this.setState({ error: undefined });
    movieTitle = movieTitle.replace(/ /g, "+");
    if (date) {
      axios.get(`http://www.omdbapi.com/?apikey=9394bd62&s=${movieTitle}&y=${date}`)
        .then((res) => {
          if (res.data.Error) throw new Error(res.data.Error);
          //calculating how many pages are there for pagination
          let lastP = (res.data.totalResults % 10) ? (((res.data.totalResults - (res.data.totalResults % 10)) / 10) + 1) : (res.data.totalResults / 10);
          this.setState({ data: res.data, s: movieTitle, lastP });
        })
        .catch((err) => {
          this.setState({ error: err });
        })
    } else {
      axios.get(`http://www.omdbapi.com/?apikey=9394bd62&s=${movieTitle}`)
        .then((res) => {
          if (res.data.Error) throw new Error(res.data.Error);
          //calculating how many pages are there for pagination
          let lastP = (res.data.totalResults % 10) ? (((res.data.totalResults - (res.data.totalResults % 10)) / 10) + 1) : (res.data.totalResults / 10);
          this.setState({ data: res.data, s: movieTitle, lastP });
        })
        .catch((err) => {
          this.setState({ error: err });
        })
    }
  }

  pageFlip = (dir) => {
    //dynamically handle all pagination buttons
    let page = this.state.page;
    switch (dir) {
      case "next":
        page++;
        this.getPage(page);
        break;
      case "back":
        page--
        this.getPage(page)
        break;
      case "last":
        this.getPage(this.state.lastP);
        break;
      case "first":
        this.getPage(1);
        break;
      default:
    }
  }

  getPage = (page) => {
    if (page < 1 || page > this.state.lastP) return;
    axios.get(`http://www.omdbapi.com/?apikey=9394bd62&s=${this.state.s}&page=${page}`)
      .then((res) => {
        if (res.data.Error) throw new Error(res.data.Error);
        this.setState({ data: res.data, page });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  nextPage = () => this.getPage(this.state.page + 1);

  lastPage = () => this.getPage(this.state.lastP);

  previousPage = () => this.getPage(this.state.page - 1);

  firstPage = () => this.getPage(1);

  render() {
    return (
      <div className="App">
        <Search fReset={this.fReset} submit={this.search} />
        <Pagination page={this.state.page} nextPage={this.nextPage} lastPage={this.lastPage} previousPage={this.previousPage} firstPage={this.firstPage} lastP={this.state.lastP} />
        <Movies error={this.state.error} movies={this.state.data.Search} />
      </div>
    );
  }
}

export default App;