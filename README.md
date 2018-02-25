# TDT4242 Group2
Shop til you drop devops and webapp project for TDT4242 2018.

(Something about which folders are relevant for code review)

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
<!--
```
GET /api/user/:id
```
Get user details for user with :id.
-->
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
