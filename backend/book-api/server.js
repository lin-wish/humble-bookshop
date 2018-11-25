let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let morgan = require('morgan');
let cors = require('cors')


app.use(cors())

// configure logger middleware
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// set our port
let port = process.env.PORT || 8888;

// DATABASE SETUP
let mongoose = require('mongoose');
mongoose.connect('mongodb://mongoforme:mongo4me@ds115664.mlab.com:15664/book', {
	useNewUrlParser: true
}); // connect to our database

// Handle the connection event
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("DB connection alive");
});

// models imported here
let Book = require('./app/models/Book');
let Cart = require('./app/models/Cart');

// ROUTES FOR OUR API
// =============================================================================

// create our router
let router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8888/api)
router.get('/', function (req, res) {
	res.json({
		message: 'Hello! welcome to Book api!'
	});
});

// on routes that end in /books
// ----------------------------------------------------
router.route('/books')

	// create a book (accessed at POST http://localhost:8888/api/books)
	.post(function (req, res) {

		let book = new Book(); // create a new instance of the Book model
		book.title = req.body.title || ''; // set the book title (comes from the request)
		book.author = req.body.author || '';
		book.createdAt = Date.now();
		book.id = req.body.id || 0;
		book.imageUrl = req.body.imageUrl || '';
		book.price = req.body.price || 0;
		book.year = req.body.year || 0;

		book.save(function (err) {
			if (err) return res.send(err);
			return res.json({
				message: 'Book created!'
			});
		});


	})

	.get(function (req, res) {
		Book.find(function (err, books) {
			if (err) res.send(err);
			res.json(books);
		});
	});

// on routes that end in /books/:book_id
// ----------------------------------------------------
router.route('/books/:book_id')

	// get the book with that id
	.get(function (req, res) {
		Book.findById(req.params.book_id, function (err, book) {
			if (err) return res.send(err);
			return res.json(book);
		});
	})

	// update the book with this id
	.put(function (req, res) {
		Book.findById(req.params.book_id, function (err, book) {
			if (err) res.send(err);

			book.title = req.body.title || ''; // set the book title (comes from the request)
			book.author = req.body.author || '';
			book.createdAt = Date.now();
			book.id = req.body.id || 0;
			book.imageUrl = req.body.imageUrl || '';
			book.price = req.body.price || 0;
			book.year = req.body.year || 0;
			book.save(function (err) {
				if (err) res.send(err);

				res.json({
					message: 'Book updated!'
				});
			});

		});
	})

	// delete the book with this id
	.delete(function (req, res) {
		Book.remove({
			_id: req.params.book_id
		}, function (err, book) {
			if (err) res.send(err);
			res.json({
				message: book.title + 'Successfully deleted'
			});
		});
	});

router.route('/cart')

	// add a book to cart (accessed at POST http://localhost:8888/api/cart)
	.post(function (req, res) {

		let cart = new Cart(); // create a new instance of the Cart model
		cart.title = req.body.title || ''; // set the added book name (comes from the request)
		cart.createdAt = Date.now()
		cart.id = req.body.id || 0;
		cart.item = req.body.item || '';
		cart.price = req.body.price || 0;

		cart.save(function (err) {
			if (err) res.send(err);
			res.json({
				message: 'Book added to cart!'
			});
		});


	})

	.get(function (req, res) {
		Cart.find(function (err, books) {
			if (err) res.send(err);
			res.json(books);
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port ' + port);