const assert = require('assert');
const validate = require('../src/validate.js');

require('dotenv').config()

describe('validate.js', () => {
    describe('#isValidNYUEmail()', () => {
        it('should accept NYU format emails', () => {
            const validEmail = 'foo123@nyu.edu';
            assert.equal(validate.isValidNYUEmail(validEmail), true);
        });

        it('should reject non-NYU format emails', () => {
            const invalidEmail = 'foobar@gmail.com';
            assert.equal(validate.isValidNYUEmail(invalidEmail), false);
        });
    });

    describe('#isValidPass()', () => {
        it('should reject passwords that are less than 8 characters', () => {
            const shortPass = 'Abcd123';
            assert.equal(validate.isValidPass(shortPass), false);
        });

        it('should reject passwords that are greater than 20 characters', () => {
            const longPass = 'AbcdAbcdAbcdAbcd12345';
            assert.equal(validate.isValidPass(longPass), false);
        });

        it('should reject passwords without at least one uppercase letter', () => {
            const passNoUppercase = 'abcd1234';
            assert.equal(validate.isValidPass(passNoUppercase), false);
        });

        it('should reject passwords without at least one lowercase letter', () => {
            const passNoLowercase = 'ABCD1234';
            assert.equal(validate.isValidPass(passNoLowercase), false);
        });

        it('should reject passwords without at least one digit', () => {
            const passNoDigits = 'ABcdEFGh';
            assert.equal(validate.isValidPass(passNoDigits), false);
        });

        it('should reject passwords with spaces', () => {
            const passWithSpaces = 'ABCd123 4';
            assert.equal(validate.isValidPass(passWithSpaces), false);
        });

        it('should accept a password within length, upper and lower case chars, digits and no spaces', () => {
            const passMeetsCriteria = 'Helloworld123';
            assert.equal(validate.isValidPass(passMeetsCriteria), true);
        });
    });

    describe('#doesPassMatchConfirmPass()', () => {
        it('should return false when pass and confirmPass do not match', () => {
            const pass = 'Helloworld123';
            const confirmPass = 'HelloWorld1233';
            assert.equal(validate.doesPassMatchConfirmPass(pass, confirmPass), false);
        });

        it('should return true when pass and confirmPass match', () => {
            const pass = 'Helloworld123';
            const confirmPass = 'Helloworld123';
            assert.equal(validate.doesPassMatchConfirmPass(pass, confirmPass), true);
        });
    });

    describe('#validatePass()', () => {
        it('should return true when passwords match and they meet all criteria', () => {
            const pass = 'Helloworld123';
            const confirmPass = 'Helloworld123';
            assert.equal(validate.validatePass(pass, confirmPass), true);
        });

        it("should return false when passwords match but they don't meet all criteria", () => {
            const pass = '123';
            const confirmPass = '123';
            assert.equal(validate.validatePass(pass, confirmPass), false);
        });

        it("should return false when passwords don't match but they do meet all criteria", () => {
            const pass = 'Helloworld12345';
            const confirmPass = 'Helloworld12321';
            assert.equal(validate.validatePass(pass, confirmPass), false);
        });

    });

    describe('#getPassMissingChars()', () => {
        it('should return no errors if password meets all criteria', () => {
            const pass = 'Helloworld123';
            const result = validate.getPassMissingChars(pass);
            assert.equal(result.length < 1, true);
        });

        it('should return min length error if password is too short', () => {
            const pass = 'Hi123';
            const result = validate.getPassMissingChars(pass);
            assert.equal(result.includes("min"), true);
        });

        it('should return max length error if password is too long', () => {
            const pass = 'Hi1234567898765432123456789654321';
            const result = validate.getPassMissingChars(pass);
            assert.equal(result.includes("max"), true);
        });

        it('should return space error if password contains a space', () => {
            const pass = 'Helloworld12 3';
            const result = validate.getPassMissingChars(pass);
            assert.equal(result.length === 1, true);
        });

        it('should return no digits error if password contains no digits', () => {
            const pass = 'Hellllllooo';
            const result = validate.getPassMissingChars(pass);
            assert.equal(result.includes("digits"), true);
        });

        it('should return no uppercase character error if password contains no upper case characters', () => {
            const pass = 'helloworld123';
            const result = validate.getPassMissingChars(pass);
            assert.equal(result.includes("uppercase"), true);
        });

        it('should return no lowercase character error if password contains no lower case characters', () => {
            const pass = 'HELLOWORLD123';
            const result = validate.getPassMissingChars(pass);
            assert.equal(result.includes("lowercase"), true);
        });

        it('should return multiple errors if password fails to meet multiple criteria', () => {
            const pass = 'a b';
            const result = validate.getPassMissingChars(pass);
            assert.equal(result.length > 3, true);
        });
    });
});