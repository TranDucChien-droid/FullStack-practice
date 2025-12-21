import { QUERY_KEYS } from '..';
import { queryClient } from '../../main';
import Request from '../Request';
import { useMutation, useQuery } from '@tanstack/react-query';

const useGetAllProductService = () => {
	const query = useQuery({
		queryKey: [QUERY_KEYS.PRODUCT],
		queryFn: async () => {
			return await Request({
				method: 'GET',
				url: '/product/get',
			});
		},
	});
	return query;
};

const useAddProductService = () => {
	const mutation = useMutation({
		mutationFn: async (payload) => {
			return await Request({
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				url: 'product/add',
				data: payload,
			});
		},
		onSuccess: (res) => {
			const data = res.data;
			alert(`Success - ${JSON.stringify(data)}`);
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT] });
		},
		onError: (error) => {
			console.log('error', error);
			throw new Error('error');
		},
	});
	return mutation;
};

const useRemoveProductService = () => {
	const mutation = useMutation({
		mutationFn: async (payload) => {
			return await Request({
				method: 'DELETE',
				url: `product/remove/${payload}`,
			});
		},
		onSuccess: (res) => {
			const data = res.data;
			alert(JSON.stringify(data));
			queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT] });
		},
		onError: (error) => {
			console.log('error', error);
			throw new Error('error');
		},
	});
	return mutation;
};

export const ProductService = {
	useGetAllProductService,
	useAddProductService,
	useRemoveProductService,
};
