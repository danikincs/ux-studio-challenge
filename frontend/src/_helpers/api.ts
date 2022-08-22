import axios from 'axios';

/**
 * Default instance for axios
 */
export const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 3000,
});

export default instance