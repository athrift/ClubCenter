# clubcenter
CS 348 Project: ClubCenter is an online web-application that allows for clubs and organizations at Purdue University to post about upcoming events so that students can easily search for ways to be involved on campus. 

Installations:
1. sudo chown -R $USER /usr/local/lib/node_modules
2. npm install -g nodemon
3. npm install mongoose express axios morgan concurrently -S
4. npm run dev (this is the command that starts the server and react website, from here you can submit a username and password and it will be loaded in the database)
Make sure to run #4 in the outmost project folder

5. npm install --save react-router-dom
6. npm i bcryptjs body-parser concurrently is-empty jsonwebtoken passport passport-jwt validator
7. npm i -g create-react-app


In react-proj (client) directory
8. npm i axios classnames jwt-decode react-redux react-router-dom redux redux-thunk

In Chrome Browser:
Extension: Redux DevTools

To run React Website type the following in terminal:<br />
cd react-proj<br />
yarn start

To run the Server and the React website concurrently type the following in terminal:<br />
npm run dev

routes:
Storing the multiple webpage routes in this folder 

models:
Storing the various data models in this folder 

Database:
Hosted on MongoDb 
Username: imahadal@purdue.edu
Password: cs348-clubcenter

Ports:
Server is running on 8080
Client (Actual Page) is running on 3000

Packages Installed:
MongoDb

A brief description of each package and the function it will serve
bcryptjs: used to hash passwords before we store them in our database
body-parser: used to parse incoming request bodies in a middleware
concurrently: allows us to run our backend and frontend concurrently and on different ports
express: sits on top of Node to make the routing, request handling, and responding easier to write
is-empty: global function that will come in handy when we use validator
jsonwebtoken: used for authorization
mongoose: used to interact with MongoDB
passport: used to authenticate requests, which it does through an extensible set of plugins known as strategies
passport-jwt: passport strategy for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT
validator: used to validate inputs (e.g. check for valid email format, confirming passwords match)

axios: promise based HTTP client for making requests to our backend
classnames: used for conditional classes in our JSX
jwt-decode: used to decode our jwt so we can get user data from it
react-redux: allows us to use Redux with React
react-router-dom: used for routing purposes
redux: used to manage state between components (can be used with React or any other view library)
redux-thunk: middleware for Redux that allows us to directly access the dispatch method to make asynchronous calls from our actions
