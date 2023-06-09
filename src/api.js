import axios from 'axios';

const app_id = 'ceaf8b4b'
const app_key = '67d5dbbd7560a1ef1c8d4e5a23f30aa1'

const api = axios.create({
  baseURL: `https://api.edamam.com/api/recipes/v2?app_id=${app_id}&app_key=${app_key}&type=public&`, // Set your base URL here
});

export default api