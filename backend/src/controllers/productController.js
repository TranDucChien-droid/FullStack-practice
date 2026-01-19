import { v2 as cloudinary } from 'cloudinary';

import productModel from '../models/productModel.js';

const uploadImages = async (files = []) => {
	if (!files || !files.length) return [];
	const urls = await Promise.all(
		files.map(async (item) => {
			const result = await cloudinary.uploader.upload(item.path, {
				resource_type: 'image',
			});
			return result.secure_url;
		})
	);
	return urls;
};

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

		const imageUrls = await uploadImages(req.files);

		const parsedSizes = sizes ? JSON.parse(sizes) : [];

		const productData = {
			name,
			description,
			price: Number(price),
			category,
			subCategory,
			sizes: parsedSizes,
			bestSeller: bestSeller === 'true',
			image: imageUrls,
			date: Date.now(),
		};

		const product = new productModel(productData);

		const response = await product.save();

		res.json({
			isSuccess: true,
			message: 'Add Product Success',
			data: response,
		});
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const updateProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const {
			name,
			description,
			price,
			category,
			subCategory,
			sizes,
			bestSeller,
		} = req.body;

		const updateData = {};
		if (name) updateData.name = name;
		if (description) updateData.description = description;
		if (price !== undefined) updateData.price = Number(price);
		if (category) updateData.category = category;
		if (subCategory) updateData.subCategory = subCategory;
		if (sizes) updateData.sizes = JSON.parse(sizes);
		if (bestSeller !== undefined) updateData.bestSeller = bestSeller === 'true';

		const imageUrls = await uploadImages(req.files);
		if (imageUrls && imageUrls.length) updateData.image = imageUrls;

		updateData.date = Date.now();

		const response = await productModel.findByIdAndUpdate(id, updateData, {
			new: true,
		});

		if (!response) {
			return res.json({ isSuccess: false, message: 'Product not Found' });
		}

		res.json({
			isSuccess: true,
			message: 'Update Product Success',
			data: response,
		});
	} catch (error) {
		console.log('res error', error);
		res.json({ isSuccess: false, message: error.message });
	}
};

export const getProducts = async (req, res) => {
	try {
		const { limit = 10, page = 1 } = req.query;
		const skip = (page - 1) * limit; // Calculate the offset

		const count  = await productModel.countDocuments({});
		const exists = await productModel.find().skip(skip).limit(limit).exec();
		res.json({
			isSuccess: true,
			message: 'Find All Success',
			length: count,
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
