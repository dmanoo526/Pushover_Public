const userInputCheck = require('./userInputCheck.js');
const mailer = require('./mailer.js');

require('./models.js');
const auth = require('./auth.js');

const index = (request, response) => {
    if (request.session.user) {
        response.redirect('dashboard');
    } else {
        response.render('index');
    }
};

const getSignup = (request, response) => {
    response.redirect('/');
};

const postSignup = (request, response) => {
    const userCredentials = request.body;
    const { email, pass, tos } = userCredentials;
    const confirmPass = userCredentials['confirm-pass'];

    const error = (message) => {
        response.render('error', { error: message });
    };

    const success = (user) => {
        auth.initAuthenticatedSession(request, user, () => {
            const { email, creditsRemaining, isVerified } = user;
            request.session.user = {
                email,
                creditsRemaining,
                isVerified
            };

            response.redirect('dashboard');
        });
    };

    if (userInputCheck.hasEmptyCredField(email, pass, tos)) {
        error('Error: missing fields');
    }

    if (userInputCheck.isTOSOff(tos)) {
        error('Error: Terms of Service and Privacy Policy not checked');
    }

    auth.signup(email, pass, confirmPass, error, success);
};

const getLogin = (request, response) => {
    if (request.session.user) {
        response.redirect('dashboard');
    } else {
        response.render('login');
    }
};

const postLogin = (request, response) => {
    const userCredentials = request.body;

    const { email, pass } = userCredentials;

    const error = (message) => {
        response.render('error', { error: message });
    };

    const success = (user) => {
        auth.initAuthenticatedSession(request, user, () => {
            const { email, creditsRemaining, isVerified } = user;
            request.session.user = {
                email,
                creditsRemaining,
                isVerified
            };
        });

        response.redirect('dashboard');
    };

    auth.login(email, pass, error, success);
};

const getDashboard = (request, response) => {
    if (request.session.user) {
        console.log(request.session.user);

        const { email, creditsRemaining, isVerified } = request.session.user;

        response.render('dashboard', {
            email: email,
            creditsRemaining: creditsRemaining
        });
    } else {
        response.redirect('/');
    }
};

const postDashboard = (request, response) => {
    // TODO: implement postDashboard
};

const help = (request, response) => {
    response.render('help');
};

const logout = (request, response) => {
    if (request.session) {
        request.session.destroy();
        request.session = null;
    }

    response.redirect('/');
};

const report = (request, response) => {
    response.render('report');
};

const postReport = (request, response) => {
    // TODO: post report email + errors

    const reportMessage = request.body;
    //console.log(reportMessage)
    const { email, subject, issue } = reportMessage;
    if (mailer.reportMail(email, subject, issue)) {
        response.render('reportsuccess');
    } else {
        response.render('error', { error: 'Error: Your message may have not sent' });
    }

};

const reportSuccess = (request, response) => {
    response.render('reportsuccess');
};

const policies = (request, response) => {
    response.render('policies');
};

const aboutUs = (request, response) => {
    response.render('aboutUs');
}

const guide = (request, response) => {
    response.render('guide');
}

module.exports = {
    index,
    getSignup,
    postSignup,
    getLogin,
    postLogin,
    getDashboard,
    postDashboard,
    help,
    logout,
    report,
    postReport,
    reportSuccess,
    policies,
    aboutUs,
    guide,
};