const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    } //if password is not first it me it doesn't hash
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(plaintext, callback) {
    // compares password if it matches
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const userModel = mongoose.model('user', userSchema)

module.exports = userModel