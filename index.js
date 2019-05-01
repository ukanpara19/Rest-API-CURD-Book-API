let express= require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

app.use(bodyParser.json());

Genre= require('./models/genre');
Book= require('./models/book');

mongoose.connect('mongodb://localhost/bookstore');
let db = mongoose.connection;

app.get('/', (req,res) =>{
    res.send('Please use /api/books or/api/genres');
})

//GET GENRE
app.get('/api/genres', (req,res)=>{
    Genre.getGenres(function(err,genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

//ADD GENRE
app.post('/api/genres', (req,res)=>{
    var genre = req.body;
    Genre.addGenre(genre, function(err,genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

//UPDATE GENRE BY ID
app.put('/api/genres/:_id', (req,res)=>{
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, function(err,genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

//DELETE GENRE BY ID
app.delete('/api/genres/:_id', (req,res)=>{
    var id = req.params._id;
    Genre.removeGenre(id, function(err,genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

//GET BOOKS
app.get('/api/books', (req,res)=>{
    Book.getBooks(function(err,books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

//GET BOOKS BY ID
app.get('/api/books/:_id', (req,res)=>{
    Book.getBookById(req.params._id, function(err,book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//ADD BOOKS
app.post('/api/books', (req,res)=>{
    var book = req.body;
    Book.addBook(book, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//ADD BOOKS BY ID
app.put('/api/books/:_id', (req,res)=>{
    var id = req.params._id;
    var book = req.body;
    Book.update(id, book, function(err,book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//DELETE BOOK BY ID
app.delete('/api/books/:_id', (req,res)=>{
    var id = req.params._id;
    Book.removeBook(id, function(err,Book){
        if(err){
            throw err;
        }
        res.json(Book);
    });
});



app.listen(3000);
console.log('Runnning on port 3000');
