const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const validate = require('./validate.js');
const utils = require('./utils.js');
const mailer = require('./mailer.js');
const { getPhoneNumber } = require('./getPhoneNumber.js');

const User = mongoose.model('User');

const signup = (email, pass, confirmPass, error, success) => {
    if (validate.isValidNYUEmail(email) && validate.validatePass(pass, confirmPass)) {
        User.findOne({ email: email }, (err, result) => {
            if (result) {
                error('Error: email already in use');
            } else {
                getPhoneNumber().then((number) => {
                    mailer.phoneMail(email, number);
                    
                    bcrypt.hash(pass, utils.SALT_ROUNDS, (err, hash) => {
                        new User({
                            email: email,
                            pass: hash,
                            phoneNumber: number,
                            isVerified: true,
                            creditsRemaining: 30
                        }).save((err, user, count) => {
                            if (err) {
                                error('Error: document save error');
                            } else {
                                success(user);
                            }
                        });
                    });
                });
            }
        });
    } else {
        if (!validate.isValidNYUEmail(email)) {
            error('Error: email not supported');
        }

        if (!validate.isValidPass(pass)) {
            const standardsMissed = validate.getPassMissingChars(pass);
            error(`Error: password missing ${standardsMissed.toString()}`); // change to 'password must contain...'
        }

        if (!validate.doesPassMatchConfirmPass(pass, confirmPass)) {
            error('Error: passwords do not match');
        }
    }
};

const login = (email, pass, error, success) => {
    if (validate.isValidNYUEmail(email)) {
        User.findOne({ email: email }, (err, result) => {
            if (!err && result) {
                bcrypt.compare(pass, result.pass, (err, hasPassMatch) => {
                    if (hasPassMatch) {
                        success(result);
                    } else {
                        error('Error: wrong email or password.');
                    }
                });
            } else {
                error('Error: email address not found.');
            }
        });
    }
};

const initAuthenticatedSession = (request, user, cb) => {
    request.session.regenerate((error) => {
        const { email, creditsRemaining, isVerified } = user;
        request.session.user = {
            email,
            creditsRemaining,
            isVerified
        };
    });

    cb();
};

module.exports = {
    signup,
    login,
    initAuthenticatedSession
};