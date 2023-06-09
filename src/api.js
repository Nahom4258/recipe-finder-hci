import axios from 'axios';
import config from './config';

const app_id = config.app_id
const app_key = config.app_key

const api = axios.create({
  baseURL: `https://api.edamam.com/api/recipes/v2?app_id=${app_id}&app_key=${app_key}&type=public&`, // Set your base URL here
});

export default api