# TDT4242 Group2
Shop til you drop devops and webapp project for TDT4242 2018.

### TOC
* [Code review info](#code-review-info)
* [Development setup](#development-setup)
* [API reference](#api-reference)

## Code review info
Here follows some useful info for those who should review our code.

The code from sprint 1 will remain in the [*master* branch](https://github.com/DeimosA/TDT4242-Group2/tree/master).
Note that *dev* is the default branch in our repo so click previous link as needed.

We have added a demo DB with an admin user and a few products that you can use if you'd like to. Just copy the `localDiskDb.db` file from `backend/_demo_db` to `backend/.tmp` after the first time you run Sails (or just create the `.tmp` dir yourself).
```
E-mail:     admin@admin.com
password:   funwithcodereview
```

<!--(link to site)-->

### Backend
Our server is based on the [Sails](https://sailsjs.com/) framework which exposes a somewhat RESTful API. The backend folder includes a lot of generated files, so we have listed the most relevant folders and files that we have edited. Sails blueprints mostly handle the regular CRUD operations, so *don't panic* if you can't find any code for them. Permissions for these operations are defined in `policies.js`.
```
backend
├─ api
│  ├─ controllers
│  │  └─ *
│  ├─ models
│  │  └─ *
│  └─ policies
│     └─ *
└─ config
   ├─ blueprints.js
   ├─ connections.js
   ├─ models.js
   ├─ policies.js
   └─ routes.js
```
More details on the app structure can be found in the [Sails docs](https://sailsjs.com/documentation/anatomy).
### Frontend
Built with [Angular 5](https://angular.io/). Everything in `frontend/src/app` basically.
Angular docs have more on the [src folder structure](https://angular.io/guide/quickstart#the-src-folder).

## Development setup
Do the following steps to set up and run the app for development. Functionality is dependent on having the backend up and running.

Install [Node.js](https://nodejs.org/en/) and make sure that npm is ticked off.

### Backend
Make sure you have sails installed. Guide and introduction to sails can be found at https://sailsjs.com/get-started

Install sails globally for the sails command to work:
```
npm i -g sails
```
To install the application, cd to the `backend` folder and run:
```
npm install
```
Still in the backend folder, serve the backend with:
```
sails lift
```
#### Bootstrapping an admin user
Create a user through the frontend or the API. Then run Sails in CLI mode with `sails console` and update the user you just created like this:
```
User.update({email: 'youremail@mail.com'}, {isAdmin: true}).exec((err, user) => {console.log(err ? err : user)})
```
Replacing `youremail@mail.com` with the email you just used to register a user.

### Frontend
Make sure you have angular installed. Follow the guide at https://angular.io/guide/quickstart

To install the application, cd to the `frontend` folder and run:
```
npm install
```
Still in the frontend folder, launch the application with:
```
npm start
```
This should automatically open a browser window to http://localhost:4200

## API reference
### Users
```
POST /api/user
```
Create a new user. Required fields: `email` and `password`.
Password must be 8 to 72 characters.
```
GET /api/user
```
Get the list of all users. Requires admin privileges.
```
GET /api/user/:id?populate=order_history
```
Get user details with order history for user with :id.
```
DELETE /api/user/:id
```
Delete user with :id. Requires admin privileges.
```
POST /api/user/login
```
Log in a user. Required fields: `email` and `password`.
```
POST /api/user/logout
```
Logout the current user.
```
GET /api/user/current
```
Get details for the currently logged in user, if any.
```
POST /api/user/:id/makeadmin
```
Give user with :id admin privileges. Requires admin privileges.
```
POST /api/user/:id/removeadmin
```
Remove admin privileges from user with :id. Requires admin privileges.

### Products
```
GET /api/product
```
Get list of all products. [*URL params apply*](https://sailsjs.com/documentation/reference/blueprint-api/find-where).
```
POST /api/product
```
Create a new product. See [model attributes](backend/api/models/Product.js) for required fields.  
Requires admin privileges.
```
GET /api/product/:id
```
Get details for product with :id.
```
PUT /api/product/:id
```
Update product with :id. Requires admin privileges.
```
DELETE /api/product/:id
```
Delete product with :id. Requires admin privileges.

### Order
```
GET /api/order?populate=user&user_confirmed=true
```
Get list of all user confirmed orders with user details. Requires admin privileges.
```
POST /api/order
```
Place a new order. Should be an array of objects with `productId` and `quantity`. Orders must be confirmed after placing.  
Returns a json response with order details like in the example below:

<details><summary>Click to expand example</summary><pre>
{
    "products": [
        {
            "product": {...},
            "quantity": 2,
            "sum": 40.6
        },
        {
            "product": {...},
            "quantity": 1,
            "sum": 19
        }
    ],
    "totalPrice": 59.6,
    "orderNumber": "TODO should be order ID",
    "orderDate": "ISO date string"
}
</pre></details><br>

```
POST /api/order/:id/confirm
```
Confirm a placed order with :id.
```
POST /api/order/:id/dismiss
```
Dismiss a placed order with :id. Must be **not confirmed** or **confirmed with status PENDING**.
