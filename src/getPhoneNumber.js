const creds = require('./creds.js');

let SID = creds.tw.SID;
let TOK = creds.tw.TOK;
const client = require('twilio')(SID, TOK);

const areaCodes = ['917', '650', '610', '203', '201'];

const randomAreaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];

const getPhoneNumber = async () => {
    return client
        .availablePhoneNumbers('US')
        .local.list({
            areaCode: randomAreaCode,
            smsEnabled: true,
            mmsEnabled: true,
            voiceEnabled: true
        })
        .then(data => {
            const number = data[0];
            return client.incomingPhoneNumbers.create({
                phoneNumber: number.phoneNumber,
                voiceMethod: 'POST',
                voiceUrl: 'https://sand-chinook-6525.twil.io/pushovercall'
            });
        })
        .then(purchasedNumber => purchasedNumber.phoneNumber);
};

module.exports = {
    getPhoneNumber
}