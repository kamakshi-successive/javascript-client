import axios from 'axios';

const callApi = async ({ Email, Password }) => {
  try {
    const response = await axios.post('http://localhost:9000/api/user/login', { email: Email, password: Password });
    const { data: { data } } = response;
    return data;
  } catch (err) {
    return err;
  }
};

export default callApi;
