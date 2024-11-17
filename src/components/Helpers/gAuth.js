import React from 'react';

const StartAuthButton = () => {
    const handleAuth = () => {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/adwords`;

        window.location.href = authUrl;
    };

    return (<button onClick={handleAuth}>Authorize Google Ads</button>);
};

export default StartAuthButton;