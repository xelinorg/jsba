const startup = process.argv.slice(2);

if (startup.length > 0 && startup[0] === 'admin') {
    let adminCredentials = startup.slice(1).reduce((acc, cur) => {
        const pair = cur.split('=');
        if (pair && pair.length === 2 && ['username', 'password'].includes(pair[0])) {
            acc[pair[0]] = pair[1];
        }
        return acc;
    }, {});

    if ((!adminCredentials.username || !adminCredentials.password) && (process.env.ADMIN_USRNAME && process.env.ADMIN_PASS)) {
        adminCredentials = {username: process.env.ADMIN_USRNAME, password: process.env.ADMIN_PASS};
    }

    if (!adminCredentials.username || !adminCredentials.password) {
        console.log('username or password missing, skipping admin creation');
        return;
    }

    const bcrypt = require('bcryptjs');
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(adminCredentials.password, salt).then((hashedpass) => {
            const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
            const db = require('./src/db');
            const dbinstance = db(`mongodb://${MONGODB_HOST}:27017/jsba`);

            dbinstance.then((dbconn)=>{
                const User = require('./src/user/model');

                const admin = new User({
                    username: adminCredentials.username,
                    password: hashedpass,
                    role: 'admin'
                });
                admin.save().then(()=>{
                    console.log('new admin created');
                    dbconn.disconnect();
                });
            });
        });
    });

} else {
    require('./src');
}
