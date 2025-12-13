import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import productModel from './models/productModel.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
	response.send('Work');
});

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

app.listen(port, async () => {
	console.log('Server started on PORT : ' + port);
	
	// await productModel.updateMany(
	// 	{}, // Find all documents
	// 	{ $set: { isAdmin: false } } // Set the new field and value
	// );
});
