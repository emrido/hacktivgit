const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

module.exports = { client, CLIENT_ID };