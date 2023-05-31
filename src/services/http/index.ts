import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line no-console
if (!baseURL) console.error('No Api url found, check you .env.local file');

const http = axios.create({ baseURL });

export default http;
