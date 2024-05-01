const mongoose = require('mongoose');
require('dotenv').config();
const connectDatabase = () => {
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}
console.log()
module.exports = connectDatabase;