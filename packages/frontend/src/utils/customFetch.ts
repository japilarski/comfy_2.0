import axios from 'axios';

const prodUrl = 'http://localhost:5001';

export const customFetch = axios.create({
  baseURL: prodUrl,
});
