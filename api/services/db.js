const mongoose = require('mongoose');

const connectMongo = async (URI) => {
    return mongoose.connect(URI);
}

module.exports = { connectMongo };