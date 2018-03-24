var express = require('express');
var router = express.Router();
var validator = require('express-validator');
router.use(validator());
var path = require("path");
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var Auth = require('../../passport/auth');

var bookController = require('./book_ctrl');



router.post('/addBook', Auth.isAuthenticated, function(req, res) {
    bookController.addBook(req, res);
});

// router.get('/getallBooks/:userId', Auth.isAuthenticated, function(req, res) {
//     bookController.getallBooks(req, res);
// });
router.get('/getallBooks', Auth.isAuthenticated, function(req, res) {
	console.log('hello getallBooks')
    bookController.getallBooks(req, res);
});

router.post('/updateBook', Auth.isAuthenticated, function(req, res) {
    bookController.updateBook(req, res);
});

router.get('/deleteBook/:bookId', Auth.isAuthenticated, function(req, res) {
    bookController.deleteBook(req, res);
});

router.get('/getBookById/:bookId', Auth.isAuthenticated, function(req, res) {
    bookController.getBookById(req, res);
});



module.exports = router;
