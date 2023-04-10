

const Book = require('../Model/books');
const path = require('path');
const uploadPath = path.join(__dirname, 'uploads', 'books');

const AddBook =  async (req, res) => {
  try {
   
    let  {name , authors} = req.body

    const book = new Book({
              name : name,
              authors :authors,
              image:req.file.filename,
            });
    await book.save();
    res.status(200).json({
      'messgae':'Save Data',
      'user':book
    });
  } catch (err) {
    // handle any errors that occurred during the update process
    console.error(err);
    res.status(500).send('An error occurred to store Data');
  }
};

const getBooks = async (req, res) => {
    try {
      const book = await Book.find();
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        res.json(book);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }


  const getBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({
            message:"record not found"
        });
      }
      res.status(200).json({
        status: 'success',
        results: book.length,
        data: {
            book
        }
    
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, authors } = req.body;
  
      let book = await Book.findById(id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      book.name = name;
      book.authors = authors;
  
      // check if a new image was uploaded
      if (req.file) {
        book.image = req.file.filename;
      }
  
      await book.save();
  
      res.status(200).json({
        message: 'Book updated successfully',
        book
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while updating the book');
    }
  };

  const deleteBook= async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).send();
      }
      res.status(200).json({
        message: "record deleted succesfully",
        book: book,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };


exports.AddBook = AddBook;
exports.getBooks = getBooks;
exports.getBook = getBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
