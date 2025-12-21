import Request from '../Request';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const useLoginService = () => {
	const navigate = useNavigate();
	const mutate = useMutation({
		mutationFn: async (payload) => {
			return await Request({
				method: 'POST',
				url: 'user/admin/login',
				data: payload,
			});
		},
		onSuccess: (res) => {
			const { token } = res.data;
			localStorage.setItem('access_token', token);
			navigate('/');
		},
		onError: (error) => {
			console.log('error', error);
			throw new Error('error');
		},
	});
	return mutate;
};

export const LoginService = { useLoginService };
