Please create a simple project (only API without UI) with requirements below

Stack: nodejs(express), mongodb, docker

You need to create role based authentication using JWT token

There are only 2 roles ‘admin’ and ‘client’

Both type of users (admin, client) should have ability to
- login
- logout
- see list of products
- see information of a specific product

Only users with role ‘admin’ are allowed to create/update/delete products

Only users with role ‘admin’ are allowed to see ‘created_by’ field of product(s)

There should be 2 containers:
 - api
 - mongodb

Schema:
```
user: {
  _id,
  username,
  password,
  name,
  lastname,
  age,
  role
}

product: {
  _id,
  name,
  price,
  description,
  created_by #id of the user who created this product
}
```
