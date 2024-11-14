const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            username,
            email,
            password
        })
        const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ succcess: true, token })
    } catch (error) {
        return console.error('Error 💥💥💥', error);
    }
}

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user || !(await user.matchPassword(password))){
            return console.error('Invalid email or password');
        }
        const token = jwt.sign( {id: user._id}, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({ success: true, token })  
    } catch (error) {
        return console.error('Error 💥💥💥', error);
    }
}