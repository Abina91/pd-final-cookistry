const axios = require('axios');

let accessToken = '';

async function getAccessToken() {
  const response = await axios.post('https://oauth.fatsecret.com/connect/token', null, {
    params: {
      grant_type: 'client_credentials',
      scope: 'basic',
    },
    auth: {
      username: '887c03b50ff248a6b695420442bc1c78', // Your Client ID
      password: '4d1b7892bf024d11983b8d15a3cddd66' // Your Client Secret
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  accessToken = response.data.access_token;
}

async function searchFood(foodName) {
  if (!accessToken) {
    await getAccessToken();
  }

  const response = await axios.get('https://platform.fatsecret.com/rest/server.api', {
    params: {
      method: 'foods.search',
      search_expression: foodName,
      format: 'json'
    },
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  return response.data;
}

module.exports = { searchFood };
