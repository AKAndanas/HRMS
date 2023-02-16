import axios from 'axios';

const getAccountData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/@me');
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default getAccountData;
