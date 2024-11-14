const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error){
        console.error('Error connecting to the database', error);

        setTimeout(() => {
            connectDB();
        }, 5000);
    }
}


module.exports = connectDB;