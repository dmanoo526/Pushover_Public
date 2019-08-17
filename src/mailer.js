require('dotenv').config();

const nodemailer = require('nodemailer');

const creds = require('./creds.js');

var transporterOptions = {
    host: 'smtp.gmail.com',
    type: 'login',
    user: creds.gm.email,
    pass: creds.gm.pass
}

function returnTransporterOptions() {
    return transporterOptions;
}

var transporter = nodemailer.createTransport({
    host: transporterOptions.host,
    auth: {
        type: transporterOptions.login,
        user: transporterOptions.user,
        pass: transporterOptions.pass
    }
});

var mailOptions = {
    from: 'pushover.authentication@gmail.com',
    to: '', //Email to be sent to
    subject: 'Test sending email',
    text: 'Email successfully sent!'
};

function phoneMail(email, number) {
    //relook again, global var
    mailOptions.to = email;
    mailOptions.subject = "PUSHOVER PHONE CREDENTIALS";
    mailOptions.text = "Thank you for signing up for Pushover.\n " +
        "We would not be able to continue functioning without your support. \n" +
        "Here is your Pushover phone number\n \n. " + number +
        "\n \n If you would like more assistance with making sure your phone number works" +
        "with your authentication platform, be sure to check out our FAQ page at " +
        "[INSERT FAQ PAGE LINK] \n" +
        "If there is anything you would like to report to us or extra assistance with, please contact " +
        "us at pushover.authentication@gmail.com or send us a report.\n" +
        "Thank you again, and we hope to have helped out your login process. \n" +
        "-Austin, Dhanvin, Justin, Wagner";
    var result = new Boolean(true);
    result = mail(mailOptions);
    return result;
};

function reportMail(email, subject, issue) {
    //relook again, global var
    mailOptions.to = 'pushover.authentication@gmail.com';
    mailOptions.subject = "REPORT SUBMISSION: " + subject;
    mailOptions.text = issue + "\n CONTACT EMAIL: " + email;
    var result = new Boolean(true);
    result = mail(mailOptions);
    return result;
};

function mail(mailOptions) {
    var result = true;
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            // console.log('Error: ', error);
            result = false;
            // console.log(result);
            return false;
        } else {
            // console.log('Email sent: ' + info.response);
            result = true;
            // console.log(result);
            return true;
        }
    })
    return result;
}

module.exports = {
    phoneMail,
    reportMail,
    mail,
    returnTransporterOptions
};