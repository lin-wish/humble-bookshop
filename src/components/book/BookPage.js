import React from 'react';
import { connect } from 'react-redux';
import BookForm from './BookForm';
import { Link } from 'react-router';
import { createBook } from '../../actions/bookActions';

class Book extends React.Component{
  constructor(props){
    super(props);
  }

  submitBook(input){
    this.props.createBook(input);
  }

  render(){
    return(
      <div className="row">
        <div className="col-md-6">
          <h3>Books</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
            {this.props.books.map((b, i) => {
              return(
                <tr key={i}>
                  <td>{b.title}</td>
                  <td><Link to={`/books/${b._id}`}>View</Link></td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h3>New Book</h3>
         <BookForm submitBook={this.submitBook.bind(this)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBook: book => dispatch(createBook(book))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
