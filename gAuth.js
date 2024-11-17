require('dotenv').config(); // Load environment variables
const { OAuth2Client } = require('google-auth-library'); // Import OAuth2Client directly

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/adwords', // Google Ads API scope
    prompt: 'consent' // Ensures a refresh token is returned
});

console.log('Authorize this app by visiting this URL:', authUrl);
