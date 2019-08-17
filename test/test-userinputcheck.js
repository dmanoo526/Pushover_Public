const assert = require('assert');
const userInputCheck = require('../src/userInputCheck.js');
describe('userinputcheck.js', () => {
    describe('#isTOSOff', () => {
        it('should return true if tos is off', () => {
            var tos = "off";
            assert.equal(true, userInputCheck.isTOSOff(tos));
        });

        it('should return false if tos is not off', () => {
            var tos = "on";
            assert.equal(false, userInputCheck.isTOSOff(tos));
        });
    });

    describe('#hasEmptyCredField', () => {
        it('should return false if all three fields are not empty', () => {
            var email = "unit.test@gmail.com"
            var pass = "test"
            var confirmPass = "test"
            assert.equal(false, userInputCheck.hasEmptyCredField(email, pass, confirmPass));
        });

        it('should return true if email is empty', () => {
            var email = ""
            var pass = "test"
            var confirmPass = "test"
            assert.equal(true, userInputCheck.hasEmptyCredField(email, pass, confirmPass));
        });

        it('should return true if pass is empty', () => {
            var email = "unit.test@gmail.com"
            var pass = ""
            var confirmPass = "test"
            assert.equal(true, userInputCheck.hasEmptyCredField(email, pass, confirmPass));
        });

        it('should return true if confirmPass is empty', () => {
            var email = "unit.test@gmail.com"
            var pass = "test"
            var confirmPass = ""
            assert.equal(true, userInputCheck.hasEmptyCredField(email, pass, confirmPass));
        });

        it('should return true if email and confirmPass are empty', () => {
            var email = ""
            var pass = "test"
            var confirmPass = ""
            assert.equal(true, userInputCheck.hasEmptyCredField(email, pass, confirmPass));
        });

        it('should return true if email and pass are empty', () => {
            var email = ""
            var pass = ""
            var confirmPass = "test"
            assert.equal(true, userInputCheck.hasEmptyCredField(email, pass, confirmPass));
        });

        it('should return true if pass and confirmPass are empty', () => {
            var email = "unit.test@gmail.com"
            var pass = ""
            var confirmPass = ""
            assert.equal(true, userInputCheck.hasEmptyCredField(email, pass, confirmPass));
        });
    });
});