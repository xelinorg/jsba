const mongoose = require('mongoose');

module.exports = async (DBURI) => {
    try {
        await mongoose.connect(DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
};
