import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import {connect} from 'react-redux';
import { fetchBooks } from '../../actions/bookActions';
import { browserHistory } from "react-router";


class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchBooks()
  }

  handleClick = (e, obj) => {
    e.preventDefault()
    let index = obj.index
    let url = `/books/${this.props.books[index]._id}`
    browserHistory.push(url)
  }

  render() {
    let photo_set = this.props.books.map(item => { return {src: item.imageUrl, width: 100, height: 133} })
    return (
      <div>
       <h1>Home Page</h1>
       <p>Latest Books</p>
       <Gallery photos={photo_set} onClick={this.handleClick} columns="4" />
      </div>
    );
}
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: () => dispatch(fetchBooks())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
