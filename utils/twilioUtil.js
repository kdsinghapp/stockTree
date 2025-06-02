const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

exports.sendOTP = async (phone) => {
  return await client.verify.v2.services(verifyServiceSid)
    .verifications
    .create({ to: phone, channel: 'sms' });
};

exports.verifyOTP = async (phone, code) => {
  return await client.verify.v2.services(verifyServiceSid)
    .verificationChecks
    .create({ to: phone, code });
};
