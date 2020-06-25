const express = require('express');
const bodyParser = require('body-parser');

const aaa = require('./middleware/aaa');
const db = require('./db');

const secret = 'xxx';
const apiv1 = '/api/v1';
const notprotected = ['/user/register', '/user/login'].map(route => apiv1 + route);
const logoutPath = apiv1 + '/user/logout';

const user = require('./user/controller')(secret);
const product = require('./product/controller')();

const app = express();

const PORT = process.env.PORT || 8080;
const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';

db(`mongodb://${MONGODB_HOST}:27017/jsba`);

app.use(bodyParser.json());
app.use(aaa(secret, notprotected, logoutPath));

app.use(apiv1, user);
app.use(apiv1, product);

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
