const mongoose = require('mongoose');

module.exports = async (DBURI) => {
    try {
        await mongoose.connect(DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return mongoose;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
