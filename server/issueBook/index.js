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

var issueBookController = require('./issueBook_ctrl');



router.post('/issuedBook', Auth.isAuthenticated, function(req, res) {
    issueBookController.issuedBook(req, res);
});
router.post('/returnBook', Auth.isAuthenticated, function(req, res) {
    issueBookController.returnBook(req, res);
});
router.post('/reIssueBook', Auth.isAuthenticated, function(req, res) {
    issueBookController.reIssueBook(req, res);
});
router.post('/getallIssuedBooks', Auth.isAuthenticated, function(req, res) {
    issueBookController.getallIssuedBooks(req, res);
});


module.exports = router;