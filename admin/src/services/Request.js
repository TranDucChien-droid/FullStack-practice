import axios from "axios";

const Request = axios.create({
	baseURL: process.env.REACT_APP_HOST_DOMAIN,
	timeout: 60000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

const isNeedToken = (url) => {
	return true;
};

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

// const appendAuthToken = (
//   config,
//   authToken
// ) => {
//   return {
//     ...config,
//     headers: {
//       ...config.headers,
//       Authorization: `Bearer ${authToken}`,
//     },
//   };
// };

Request.interceptors.request.use(
	(config) => {
		if (!isNeedToken(config?.url)) {
			return config;
		}
		return appendAuthToken(
			config,
			store?.getState()?.['feature/auth']?.access_token
		);
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
