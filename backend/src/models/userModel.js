import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		cartData: { type: Object, default: {} },
		isAdmin: { type: Boolean, default: false },
	},
	{
		minimize: false, // Set to false to save empty 'metadata' objects
	}
);

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;
