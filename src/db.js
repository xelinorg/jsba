const mongoose = require('mongoose');

module.exports = async (DBURI) => {
    try {
        await mongoose.connect(DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 1000
        });
        return mongoose;
    } catch (e) {
        throw e;
    }
};
