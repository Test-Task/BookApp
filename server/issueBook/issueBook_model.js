var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issuedBookSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    issueDate: { type: Date },
    returnDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
    isReturn: { type: Boolean, default: false },
    reIssue: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('issuedBook', issuedBookSchema);