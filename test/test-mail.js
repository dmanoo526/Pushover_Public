const assert = require('assert');
const mailer = require('../src/mailer.js');
const creds = require('../src/creds.js');

require('dotenv').config();
describe('mail.js', () => {
    describe('#mail()', () => {
        it('should correctly send emails', () => {
            var mailOptions = {
                from: 'pushover.authentication@gmail.com',
                to: 'pushover.authentication@gmail.com', //Email to be sent to
                subject: 'Unit Test',
                text: 'Unit Test'
            };

            assert.equal(true, mailer.mail(mailOptions));
        });

    });

    describe('#transporter', () => {
        it('should have valid creds', () => {
            assert.equal('smtp.gmail.com', mailer.returnTransporterOptions().host);
            assert.equal('login', mailer.returnTransporterOptions().type);
            assert.equal(creds.gm.email, mailer.returnTransporterOptions().user);
            assert.equal(creds.gm.pass, mailer.returnTransporterOptions().pass);
        });
    });


});