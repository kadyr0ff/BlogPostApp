const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator')

const bcrypt = require('bcrypt') //npm install bcrypt

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Username must not be empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password must not be empty']
    }
});

UserSchema.plugin(validator)

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10,  (error, hash) => {
        user.password = hash
        next()
    });
});

const User = mongoose.model('User',UserSchema);
module.exports = User
  