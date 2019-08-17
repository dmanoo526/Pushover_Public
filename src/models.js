const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    pass: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    creditsRemaining: {
        type: Number,
        default: 0
    }
});

// const EmailHashSchema = new Schema({});

mongoose.model('User', UserSchema);
// mongoose.model('EmailHash', EmailHashSchema);

let connectDB = undefined;

if (process.env.NODE_ENV === 'PROD') {
    // connectDB = 'production environemnt' // prod
} else {
    connectDB = 'mongodb://localhost/pushover' // dev
}
// ------------------------------

mongoose.connect(connectDB, { useNewUrlParser: true });