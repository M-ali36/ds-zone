// src/api/callback.js
import { OAuth2Client } from 'google-auth-library'; // Import OAuth2Client directly

export default async function handler(req, res) {
    const oauth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Authorization code is missing.');
    }

    try {
        // Exchange authorization code for access and refresh tokens
        const { tokens } = await oauth2Client.getToken(code);

        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token); // This is the token you need

        res.send('Tokens received! Check the console for your refresh token.');
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        res.status(500).json({ error: error.message });
    }
}
