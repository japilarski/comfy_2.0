import axios from 'axios';

const prodUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: prodUrl,
});
