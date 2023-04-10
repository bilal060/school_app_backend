const express = require('express')
const { AddBook,getBooks,getBook,updateBook,deleteBook } = require('../Controller/bookController');
const Booksrouter = express.Router()


const { Bookupload } = require('../Middleware/uploadImage');


Booksrouter.post('/Book',Bookupload.single('image'),AddBook);
Booksrouter.get('/Book',getBooks);
Booksrouter.get('/Book/:id',getBook);
Booksrouter.patch('/Book/:id',Bookupload.single('image'),updateBook);
Booksrouter.delete('/Book/:id',deleteBook);

module.exports =Booksrouter;


