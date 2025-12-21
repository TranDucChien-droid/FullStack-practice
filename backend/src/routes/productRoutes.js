import express from 'express';
import {
	addProduct,
	getProductByID,
	getProducts,
	removeProduct,
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import { adminAuth } from '../middleware/adminAuth.js';

const productRoutes = express.Router();

productRoutes.get('/get', getProducts);
productRoutes.get('/get/:id', getProductByID);
productRoutes.post('/add', adminAuth, upload.array('image', 10), addProduct);
productRoutes.delete('/remove/:id', adminAuth, removeProduct);

export default productRoutes;
