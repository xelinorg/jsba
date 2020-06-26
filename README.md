This is another javascript basic app for demonstrating some coding skills.

The requirements that led to the creation of this project can be found on the [OriginalRequirements.md](OriginalRequirements.md)

You have two options to test run the application. The first and most favorable is with docker as it will not pollute or alter your environment. There is an npm script on package.json that builds and runs the containers.


The other way of running the application is the classic and requires a mongod local or remote instance running on the default port. You can configure only the host part of the URI at the moment through the ***$MONGODB_HOST*** environment variables.

As seen on the requirements only users having the admin role can create/update/delete products. The API does not allow the creation of users with the admin role and you should create this type of user from the command line by executing something similar to the following on the root directory of the project.

You should export the admin username and password for docker as well or you will have to connect to the running api container later to execute the script from within the running instance.

```bash
$ export ADMIN_USRNAME=myadminusr
$ export ADMIN_PASS=myadminpassword
```
For classical run
```bash
$ npm run admin # this creates the admin user
$ npm run start
```
For docker run
```bash
$ npm run build
```

Inside the test directory are some bash scripts that use **curl** to interact with the API and register, login, logout users or create, list, update, delete products. The scripts are useful to see how you should craft the API calls if you are using some other tool like **Postman**

An example for registering a client user would be to execute the following from the root directory

```bash
bash test/user_register.sh myusername mypassword john doe 33
```

To login a registered user

```bash
bash test/user_login.sh myusername mypassword
```

To create a product login with an admin user and use the returned jwt token

```bash
bash test/product_create.sh hereis.myverylongjwttoken.returnedfromthelogincall ball 12 red\ bounce\ and\ glow\ ball
```

There are some things that would be nice to be done in order to better the project
- refactor nested functionality and add some unit testing
- wire out some more configuration to environment variables and use something like dotenv
- consolidate strings used around the codebase for messages or configuration
- give more options for the docker images like dump and restore of the database or create a test container to run the scripts inside the test directory
- use webpack to make a bundle of the javascript codebase

If you find any issues with the project or have trouble running, please get back to me as I would be more than happy to help and solve what is not working as you expected.

Versions used are the following
- node 12.14.1
- mongodb 4.2.8
- docker 19.03.12
- docker-compose 1.16.1
