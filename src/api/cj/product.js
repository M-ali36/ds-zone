import fetch from 'node-fetch';
import { serialize, parse } from 'cookie';

const productCache = new Map();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAccessToken() {
  const response = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'drmaco0o@gmail.com', // Replace with your registered email
      password: '414e1a551cd64af7b9538eac91b3f37d', // Replace with your API key
    }),
  });
  const data = await response.json();
  if (!data || !data.data || !data.data.accessToken) {
    throw new Error("Failed to retrieve access token");
  }
  return data.data.accessToken;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product Link is required" });
    }

    try {
      if (productCache.has(productId)) {
        console.log("Returning cached data for:", productId);
        return res.status(200).json(productCache.get(productId));
      }

      // Parse cookies to check for an existing token
      const cookies = parse(req.headers.cookie || '');
      let accessToken = cookies.cjAccessToken;

      // Fetch a new token if not found or expired
      if (!accessToken) {
        console.log("Fetching a new access token...");
        accessToken = await getAccessToken();

        // Save token in a secure, HTTP-only cookie with 5-minute expiration
        res.setHeader('Set-Cookie', serialize('cjAccessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 300, // 5 minutes
          path: '/',
        }));
      } else {
        console.log("Using token from cookies...");
      }

      const apiUrl = `https://developers.cjdropshipping.com/api2.0/v1/product/productComments?pid=${productId}`;

      // Make the API request
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "CJ-Access-Token": accessToken,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        if (response.status === 429 || errorText.includes("Risk control restrictions")) {
          console.log("Rate limit hit. Adding delay...");
          await delay(2000); // Delay to handle rate limiting
          throw new Error("Rate limit hit. Please retry later.");
        }
        throw new Error(`Request failed: ${response.statusText}, ${errorText}`);
      }

      const data = await response.json();
      productCache.set(productId, data);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
