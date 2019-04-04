const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
    },
    avatar: String
});

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Validation Error: Email already exists'));
    } else {
        next();
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;