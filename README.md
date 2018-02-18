# TDT4242-Group2

## Frontend
Make sure you have angular installed. Follow the guide at https://angular.io/guide/quickstart

To install the application, CD to the frontend folder, and write "npm install"

To locally run the frontend on your computer, CD to the frontend folder, and launch the application with 'ng serve -open'
Functionality is dependent on having the backend up and running.

## Backend
Make sure you have sails installed. Guide and introduction to sails can be found at https://sailsjs.com/get-started

To install the application, CD to the backend folder, and write "npm install"

To locally run the backend on your computer, CD to the backend folder, and serve the backedn with "sails lift"

## API reference
### Users
```
POST /api/user
```
Create a new user.  
Required fields: `email` and `password`.
Password must be 8 to 72 characters.
```
GET /api/user
```
Get list of users.
```
GET /api/user/:id
```
Get user details for user with :id.
```
DELETE /api/user/:id
```
Delete user with :id.
