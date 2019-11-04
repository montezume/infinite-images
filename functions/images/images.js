/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  const headers = {
    Accept: "application/json",
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
  };

  try {
    const { page = 1 } = event.queryStringParameters;

    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}`,
      {
        headers
      }
    );
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
