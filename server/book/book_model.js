var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: { type: String },
    description: { type: String },
    noOfCopies: { type: Number },
    author: { type: String },
    issuedCopies: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);