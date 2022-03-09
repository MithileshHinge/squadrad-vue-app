import axios from 'axios';
import { BASE_DOMAIN } from '../config';

const baseURL = `${BASE_DOMAIN}/api`;

export default axios.create({
	baseURL,
});
