const passwordValidator = require('password-validator');

const isValidNYUEmail = (email) => {
    const nyuEmailRegex = /^[A-Za-z]+[0-9]+@nyu.edu$/;
    return nyuEmailRegex.test(email);
};

const createPassSchema = () => {
    const schema = new passwordValidator();
    schema
        .is().min(8)
        .is().max(20)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces();
    return schema;
};

const isValidPass = (pass) => {
    const schema = createPassSchema();
    return schema.validate(pass);
};

const doesPassMatchConfirmPass = (pass, confirmPass) => {
    return pass === confirmPass;
};

const validatePass = (pass, confirmPass) => {
    return isValidPass(pass) && doesPassMatchConfirmPass(pass, confirmPass);
};

const getPassMissingChars = (pass) => {
    const schema = createPassSchema();
    return schema.validate(pass, { list: true });
};

module.exports = {
    isValidNYUEmail,
    createPassSchema,
    isValidPass,
    doesPassMatchConfirmPass,
    validatePass,
    getPassMissingChars
};