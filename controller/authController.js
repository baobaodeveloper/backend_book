import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    await User.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(200).json({
      message: 'Register success',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'User not found'));

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword)
      return next(createError(400, 'Wrong password or username!'));
    const { password, isAdmin, ...others } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ ...others, isAdmin });
  } catch (error) {
    next(error);
  }
};
