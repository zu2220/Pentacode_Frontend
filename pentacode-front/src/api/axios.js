import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://apis-pentacode-2.vercel.app/api/v1',
});

export default instance;