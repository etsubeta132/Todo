const mongoose = require('mongoose');


const mongoURI = `mongodb+srv://etsub:F5E7X4AtWuyFUMAN@cluster0.gcvj3g7.mongodb.net/Tasks?retryWrites=true&w=majority`;

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing connection');
        return;
    }

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
