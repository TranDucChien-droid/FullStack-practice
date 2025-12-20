import axios from 'axios';
import { backendURL } from '../App';

const Request = axios.create({
	baseURL: backendURL,
	timeout: 60000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

// const refreshToken = async (config, refreshToken) => {
//   return await axios.post(
//     `${process.env.REACT_APP_HOST_DOMAIN}${URL.auth.refresh_token}`,
//     {
//       refresh_token: refreshToken,
//     },
//     {
//       ...config,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };

const appendAuthToken = (config, authToken) => {
	return {
		...config,
		headers: {
			...config.headers,
			token: `${authToken}`,
			Authorization: `${authToken}`,
		},
	};
};

Request.interceptors.request.use(
	(config) => {
		const access_token = localStorage.getItem('access_token');
		return appendAuthToken(config, access_token);
	},
	(error) => {
		return Promise.reject(error?.message);
	}
);

Request.interceptors.response.use(
	(response) => {
		// console.log(response);
		return response;
	},
	async (error) => {
		const { config, response } = error;
		console.log('Error', error);
	}
);
export default Request;
