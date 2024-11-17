// keyword-planner-service.js
const { GoogleAdsApi } = require('google-ads-api');

const client = GoogleAdsApi.init({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    developer_token: process.env.DEVELOPER_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN
});

async function generateKeywordIdeas(seedKeywords) {
    const keywordPlanIdeaService = client.KeywordPlanIdeaService;
    const request = {
        keywordPlanNetwork: 'SEARCH_AND_DISPLAY',
        languageCode: 'en',
        geoTargetConstants: ['US'],
        keywordSeed: seedKeywords
    };

    const response = await keywordPlanIdeaService.generateKeywordIdeas(request);
    return response.results;
}

module.exports = { generateKeywordIdeas };