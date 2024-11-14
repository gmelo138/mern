const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password
        })
        const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ succcess: true, token })
    } catch (error) {
        return next(new ErrorResponse(error.message, 500))
    }
}

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user || !(await user.matchPassword(password))){
            return next(new ErrorResponse('Invalid credentials', 401))
        }
        const token = jwt.sign( {id: user._id}, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({ success: true, token })  
    } catch (error) {
        return next(new ErrorResponse(error.message, 500))
    }
}