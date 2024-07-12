const express = require('express');

const aaa = require('./middleware/aaa');
const db = require('./db');

const secret = process.env.JWT_SECRET || 'xxx';
const MONGODB_URI = process.env.MONGODB_URI  || 'mongodb://localhost:27017/jsba';
const PORT = process.env.PORT || 8080;

const apiv1 = '/api/v1';
const notprotected = ['/user/register', '/user/login'].map(route => apiv1 + route);
const logoutPath = apiv1 + '/user/logout';

const user = require('./user/controller')(secret);
const product = require('./product/controller')();

const app = express();

app.use(express.json());
app.use(aaa(secret, notprotected, logoutPath));

app.use(apiv1, user);
app.use(apiv1, product);

db(MONGODB_URI).then((mongoose) => {
    console.log('connected to database!');
    mongoose.connection.on('error', error => {
        console.log('database error', error.message);
    });
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
}).catch(error => console.log('could not connect to database!', error.message));
