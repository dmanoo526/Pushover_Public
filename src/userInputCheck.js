const hasEmptyCredField = (email, pass, confirmPass) => {
    return !email.length || !pass.length || !confirmPass.length;
};

const isTOSOff = (tos) => {
    return tos === 'off';
};

// add check for whether user's account exists or not

module.exports = {
    hasEmptyCredField,
    isTOSOff
};