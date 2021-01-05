/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';
import ls from 'local-storage';

const callApi = async (data, method, url) => {
  try {
    const baseUrl = process.env.REACT_APP_BASE_URL + url;
    const { email, password } = data;
    const response = await axios({
      method,
      url: baseUrl,
      data: {
        email,
        password,
      },
    });
    ls.set('Token: ', response.data.data);
    const token = ls.get('token');
    console.log('Token:: ', token);
  } catch (error) {
    console.log('Inside Catch');
    return { status: 'error', message: 'This is a error message' };
  }
};

export default callApi;
