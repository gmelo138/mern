const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    } catch {
        console.log('Error connecting to the database');

        setTimeout(() => {
            connectDB();
        }, 5000);
    }
}


module.exports = connectDB;