import React from 'react';
import {connect} from 'react-redux';
import BookDetails from './BookDetails'
import { fetchBookById, addToCart } from '../../actions/bookActions';


class BookDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
      this.props.fetchBookById(this.props.params.id);
    }

    addToCart(book){
      const item = {
        title: book.title,
        price: book.price
      };
      this.props.addToCart(item);
    }

    render() {
        return (
            <div>
                <h1>Book Details Page</h1>
                <br />
                <BookDetails book={this.props.book} addToCart={this.addToCart.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      book: state.book
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchBookById: bookId => dispatch(fetchBookById(bookId)),
      addToCart: item => dispatch(addToCart(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);
