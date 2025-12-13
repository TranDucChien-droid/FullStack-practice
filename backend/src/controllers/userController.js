import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email });

		if (!user) {
			return res.json({
				isSuccess: false,
				message: 'User does not exist',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.json({
				isSuccess: false,
				message: 'Wrong password',
			});
		}

		const token = createToken(user._id);
		res.json({ isSuccess: true, message: 'Login Success', token });

	} catch (error) {
		console.log('res error', error);
		return res.json({ isSuccess: false, message: error.message });
	}
};

export const loginAdmin = async (req, res) => {};

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const exists = await userModel.findOne({ email });

		if (exists) {
			return res.json({ isSuccess: false, message: 'User exists' });
		}

		if (!validator.isEmail(email)) {
			return res.json({ isSuccess: false, message: 'Not Email' });
		}

		if (password.length < 8) {
			return res.json({ isSuccess: false, message: 'Weak password' });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			name,
			email,
			password: hashedPassword,
		});

		const user = await newUser.save();

		const token = createToken(user._id);

		res.json({ isSuccess: true, message: 'Gen Token', token });

		// console.log('res', res);
	} catch (error) {
		console.log('res error', error);
		return res.json({ isSuccess: false, message: error.message });
	}
};

export const findAll = async (req, res) => {
	try {
		const exists = await userModel.find().exec();

		console.log('res', res.owner);

		res.json({
			isSuccess: true,
			message: 'Find All Success',
			data: exists,
			length: exists.length,
		});
	} catch (error) {
		console.log('res error', error);
		return res.json({ isSuccess: false, message: 'Error' });
	}
};
