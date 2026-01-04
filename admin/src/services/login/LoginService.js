import Request from '../Request';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/redux/store';
import { updateToken } from '@/redux/auth/AuthSlice';

const useLoginService = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
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
			dispatch(updateToken({ access_token: token }));
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
