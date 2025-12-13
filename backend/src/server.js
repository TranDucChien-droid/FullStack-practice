import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
	response.send('Work');
});

app.use('/api/user', userRouter);

app.listen(port, () => console.log('Server started on PORT : ' + port));
