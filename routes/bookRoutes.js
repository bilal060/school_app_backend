const express = require('express')
const { AddBook,getBooks,getBook,updateBook,deleteBook } = require('../Controller/bookController');
const Booksrouter = express.Router()


const  bookUpload  = require('../Middleware/uploadImage');


Booksrouter.post('/Book',bookUpload.single('image'),AddBook);
Booksrouter.get('/Book',getBooks);
Booksrouter.get('/Book/:id',getBook);
Booksrouter.patch('/Book/:id',bookUpload.single('image'),updateBook);
Booksrouter.delete('/Book/:id',deleteBook);

module.exports =Booksrouter;


