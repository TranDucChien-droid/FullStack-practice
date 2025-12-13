import { v2 as cloudinary } from 'cloudinary';

import productModel from '../models/productModel.js';

export const addProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			category,
			subCategory,
			sizes,
			bestSeller,
		} = req.body;

		const image1 = req?.files?.image1?.[0];
		const image2 = req?.files?.image2?.[0];
		const image3 = req?.files?.image3?.[0];
		const image4 = req?.files?.image4?.[0];

		const images = [image1, image2, image3, image4].filter(Boolean);

		const imageUrls = await Promise.all(
			images.map(async (item) => {
				let result = await cloudinary.uploader.upload(item.path, {
					resource_type: 'image',
				});
				return result.secure_url;
			})
		);

		const productData = {
			name,
			description,
			price: Number(price),
			category,
			subCategory,
			sizes: JSON.parse(sizes),
			bestSeller: bestSeller === 'true',
			image: imageUrls,
			date: Date.now(),
		};

		const product = new productModel(productData);

		const response = await product.save();

		res.json({
			isSuccess: true,
			message: 'Success',
			data: response,
		});
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const getProducts = async (req, res) => {
	try {
		const exists = await productModel.find().exec();
		res.json({
			isSuccess: true,
			message: 'Find All Success',
			length: exists.length,
			data: exists,
		});
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const getProductByID = async (req, res) => {
	try {
		const id = req.params.id;
		const response = await productModel.findById(id);

		res.json({
			isSuccess: true,
			message: 'Find Success',
			data: response,
		});
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const removeProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const response = await productModel.findByIdAndDelete(id);

		if (!response) {
			return res.json({ isSuccess: false, message: 'Product not Found' });
		}

		res.json({
			isSuccess: true,
			message: 'Remove Product Success',
			data: response,
		});
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};
