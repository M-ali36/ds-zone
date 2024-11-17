import axios from 'axios';

export default async function handler(req, res) {
    const keywordText = req.query.keywordText || 'home decor items';
    const locationId = req.query.locationId || '2840';
    const languageId = req.query.languageId || '1000';

    try {

        const url = `https://googleads.googleapis.com/v18/customers/${process.env.CUSTOMER_ID}:generateKeywordIdeas`;

        const response = await axios.post(
            url,
            {
                keywordSeed: { keywords: [keywordText] },
                geoTargetConstants: [`geoTargetConstants/${locationId}`],
                languageConstants: [`languageConstants/${languageId}`],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    'developer-token': process.env.DEVELOPER_TOKEN,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Keyword Suggestions:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching keyword suggestions:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message || 'Failed to fetch keyword suggestions' });
    }
}
