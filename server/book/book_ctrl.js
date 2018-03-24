var Book = require('./book_model');
// var User = require('../user/users_model');
module.exports = {
    addBook: function(req, res) {
        var bookRecord = new Book({
            title: req.body.title,
            description: req.body.description,
            noOfCopies: req.body.noOfCopies,
            author: req.body.author
        });
        console.log(bookRecord);
        bookRecord.save(function(err, book) {
            if (err) {
                res.json({ status: 201, message: err });
            } else {
                res.json({ status: 200, message: 'Book added successfully', data: book });
            }
        });
    },

    getallBooks: function(req, res) {
        Book.find({ isDeleted: false }, { _id: 1, title: 1, description: 1, author: 1, noOfCopies: 1 }).sort({ createdAt: -1 })
            .exec(function(err, books) {
                if (err) {
                    res.json({ status: 201, messages: err });
                } else {
                    res.json({ status: 200, messages: "Record fatched successfully", books: books });

                }
            });
    },



    //Delete book using book id
    deleteBook: function(req, res) {
        console.log('Calling Book delete controller before- Id-:' + req.params.bookId);
        Book.findOneAndUpdate({ _id: req.params.bookId }, { $set: { isDeleted: true } }, function(err) {
            if (err) {
                res.json({ status: 201, messages: err });
            } else {
                console.log('Book has been deleted');
                res.json({ status: 200, message: "Book has been deleted" });
            }
        });

    },
    getBookById: function(req, res) {
        Book.findOne({ _id: req.params.bookId }, function(err, book) {
            if (err) {
                res.json({ status: 201, messages: err });
            } else {
                console.log('Book has been deleted');
                res.json({ status: 200, message: "Book has been fetched successfully", data: book });
            }
        });

    },
    //Update book using book id
    updateBook: function(req, res) {
        console.log('Calling Book delete controller before- Id-:' + req.params.bookId);
        Book.findOneAndUpdate({ _id: req.body.bookId }, { $set: { title: req.body.title, description: req.body.description, noOfCopies: req.body.noOfCopies, author: req.body.author } }, { new: true }, function(err, updatedBook) {
            if (err) {
                res.json({ status: 201, messages: err });
            } else {
                console.log('Book has been updated successfully');
                res.json({ status: 200, message: "Book has been updated successfully", updatedBook: updatedBook });
            }
        });

    },

}