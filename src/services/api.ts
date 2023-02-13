import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://7rscccr998.execute-api.us-east-1.amazonaws.com/dev',
});

export default api;
