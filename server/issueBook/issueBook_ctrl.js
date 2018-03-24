var IssuedBook = require('./issueBook_model');
var Book = require('../book/book_model');
var moment = require('moment')
var User = require('../user/users_model');
module.exports = {
    issuedBook: function(req, res) {
        // console.log(issuedBookRecord);
        Book.findOne({ _id: req.body.bookId }, function(err, bookRecord) {
            if (err) {
                res.json({ status: 201, message: err });
            } else {
                if (bookRecord.issuedCopies <= bookRecord.noOfCopies) {
                    var issuedCopy = bookRecord.issuedCopies;
                    issuedCopy += 1;
                    var issuedBookRecord = new IssuedBook({
                        userId: req.body.userId,
                        bookId: req.body.bookId,
                        issueDate: moment(),
                        returnDate: moment().add(7, 'days'),
                    });
                    issuedBookRecord.save(function(err, issuedBook) {
                        if (err) {
                            res.json({ status: 201, message: err });
                        } else {
                            Book.findOneAndUpdate({ _id: req.body.bookId }, { $set: { issuedCopies: issuedCopy } }, { new: true }, function(err, updatedBook) {
                                if (err) {
                                    res.json({ status: 201, messages: err });
                                } else {
                                    res.json({ status: 200, message: 'Book Issued successfully', data: issuedBook });

                                }
                            });
                        }
                    });
                } else {
                    res.json({ status: 200, message: 'Book not Issued no of coies is not available', data: {} });

                }

            }
        })
    },


    returnBook: function(req, res) {
        IssuedBook.findOneAndUpdate({ _id: req.body.issuedBookId }, { $set: { isReturn: true } }, { new: true }, function(err, updatedIssueBook) {
            if (err) {
                res.json({ status: 201, message: err });
            } else if (updatedIssueBook) {
                Book.findOne({ _id: updatedIssueBook.bookId }, function(err, bookRecord) {
                    if (err) {
                        res.json({ status: 201, messages: err });
                    } else if (bookRecord.issuedCopies > 0) {
                        var issuedCopy = bookRecord.issuedCopies;
                        issuedCopy -= 1;
                        Book.findOneAndUpdate({ _id: updatedIssueBook.bookId }, { $set: { issuedCopies: issuedCopy } }, { new: true }, function(err, updatedBook) {
                            if (err) {
                                res.json({ status: 201, messages: err });
                            } else {
                                res.json({ status: 200, message: 'Book returned successfully', data: updatedIssueBook });

                            }
                        });
                    } else {
                        res.json({ status: 201, message: 'No Book issued yet' });

                    }
                });
            } else {
                res.json({ status: 201, message: 'Record not found' });
            }
        })
    },

    returnBook: function(req, res) {
        IssuedBook.findOneAndUpdate({ _id: req.body.issuedBookId }, { $set: { isReturn: true } }, { new: true }, function(err, updatedIssueBook) {
            if (err) {
                res.json({ status: 201, message: err });
            } else if (updatedIssueBook) {
                Book.findOne({ _id: updatedIssueBook.bookId }, function(err, bookRecord) {
                    if (err) {
                        res.json({ status: 201, messages: err });
                    } else if (bookRecord.issuedCopies > 0) {
                        var issuedCopy = bookRecord.issuedCopies;
                        issuedCopy -= 1;
                        Book.findOneAndUpdate({ _id: updatedIssueBook.bookId }, { $set: { issuedCopies: issuedCopy } }, { new: true }, function(err, updatedBook) {
                            if (err) {
                                res.json({ status: 201, messages: err });
                            } else {
                                res.json({ status: 200, message: 'Book returned successfully', data: updatedIssueBook });

                            }
                        });
                    } else {
                        res.json({ status: 201, message: 'No Book issue yet' });

                    }
                });
            } else {
                res.json({ status: 201, message: 'Record not found' });
            }
        })
    },
    reIssueBook: function(req, res) {
        IssuedBook.findOneAndUpdate({ _id: req.body.issuedBookId }, { $set: { reIssue: true, issueDate: moment(), returnDate: moment().add(7, 'days'), } }, { new: true }, function(err, updatedIssueBook) {
            if (err) {
                res.json({ status: 201, message: err });
            } else if (updatedIssueBook) {
                res.json({ status: 200, message: 'Book re-issue successfully', data: updatedIssueBook });
            } else {
                res.json({ status: 201, message: 'No Book issue yet' });

            }
        });
    },
    getallIssuedBooks: function(req, res) {
        IssuedBook.find({ userId: req.body.userId, isDeleted: false }).sort({ createdAt: -1 })
            .populate('userId', 'username email')
            .populate('bookId', 'title description author')
            .exec(function(err, issuedBooks) {
                if (err) {
                    res.json({ status: 201, messages: err });
                } else {
                    res.json({ status: 200, messages: "Record fatched successfully", issuedBooks: issuedBooks });

                }
            });
    },
}