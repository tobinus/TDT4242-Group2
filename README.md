# TDT4242 Group2
Shop til you drop devops and webapp project for TDT4242 2018.

### TOC
* [Code review info](#code-review-info)
* [Development setup](#development-setup)
* [API reference](#api-reference)

## Code review info
Here follows some useful info for those who should review our code.

The code from sprint 1 will remain in the [*master* branch](https://github.com/DeimosA/TDT4242-Group2/tree/master).
Note that *dev* is the default branch in our repo so click link above as needed.

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
### Backend
Make sure you have sails installed. Guide and introduction to sails can be found at https://sailsjs.com/get-started

Install sails globally for the sails command to work:
```
npm i -g sails
```
To install the application, CD to the backend folder and run:
```
npm install
```
To locally run the backend on your computer, CD to the backend folder, and serve the backend with:
```
sails lift
```
###### Bootstrapping an admin user
Create a user through the frontend or the API. Then run Sails in CLI mode with `sails console` and update the user you just created like this:
```
User.update({email: youremail@mail.com}, {isAdmin: true}).exec()
```
Replacing the email address with the one you just used to create a user.

### Frontend
Make sure you have angular installed. Follow the guide at https://angular.io/guide/quickstart

To install the application, CD to the frontend folder and write:
```
npm install
```
To locally run the frontend on your computer, CD to the frontend folder, and launch the application:
```
npm start
```

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
GET /api/user/:id?populate=purchase_history
```
Get user details with purchase history for user with :id.
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
Get list of all products. *URL params apply*
```
POST /api/product
```
Create a new product. Requires admin privileges.
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
