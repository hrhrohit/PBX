import axios from 'axios';

const BASE_URL = 'https://telco-api.skyswitch.com';
const ACCOUNT_ID = 'fc1460f0-0c6b-11ee-8fe4-89fef5533427';

const getAccessToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/oauth/token`, {
      grant_type: 'password',
      client_id: '160',
      client_secret: 'p5ZLmAe5J!#SvDl@YwugYeT1t67?9wN@zF312wG',
      username: 'sky-api@primecall.com',
      password: '8$jW1t!#tR2$^@D!R',
      scope: '*'
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export const getDomains = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(`${BASE_URL}/accounts/${ACCOUNT_ID}/pbx/domains`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching domains:', error);
    throw error;
  }
};
