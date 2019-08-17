const path = require('path');

const engines = require('consolidate');
const bodyParser = require('body-parser');
const express = require('express');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const creds = require('./creds.js');
const routes = require('./routes.js');

const app = express();

app.engine('hbs', engines.handlebars);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sessionConfig = {
    resave: false,
    secret: 'qwerty',
    saveUninitialized: false
};

const mongoStoreOptions = {
    autoRemove: 'interval'
};

if (process.env.NODE_ENV === 'PROD') {
    // mongoStoreOptions.url = '';
    // mongoStoreOptions.autoRemoveInterval = 60 * 24;
} else {
    mongoStoreOptions.url = 'mongodb://localhost/pushover';
    mongoStoreOptions.autoRemoveInterval = 1;
}

sessionConfig.store = new MongoStore(mongoStoreOptions);
app.use(session(sessionConfig));

app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'hbs');

// ==============================
//          twilio creds
// ------------------------------
let SID = creds.tw.SID;
let TOK = creds.tw.TOK;
const client = require('twilio')(SID, TOK);

app.get('/', routes.index);

app.get('/signup', routes.getSignup);
app.post('/signup', routes.postSignup);

app.get('/login', routes.getLogin);
app.post('/login', routes.postLogin);

app.get('/report', routes.report);
app.post('/report', routes.postReport);

app.get('/reportsuccess', routes.reportSuccess);

app.get('/dashboard', routes.getDashboard);
app.get('/dashboard', routes.postDashboard);

app.get('/logout', routes.logout);

app.get('/help', routes.help);

app.get('/policies', routes.policies);

app.get('/aboutUs', routes.aboutUs);

app.get('/guide', routes.guide);

app.listen(process.env.PORT || 9001);