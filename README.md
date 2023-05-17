# social-network-api


## Description
This is an API where different users can share their thoughts and reactions as well as create a friend list. This project uses `Express.JS` for routing, a `MongoDB Database`, a `Mongoose ODM`, the seed data is created using `insomnia`

## Motivation
The motivation for this project was to use a real life example to practice and seed `MongoDB`

## Usage 
To start the application, run `npm start`
The mongoose models should then be synced to your DB
Open MongoDB and connect using the `mongodb://localhost:27017` URI. You should see a thoughts and users folder inside the db
To create seed data and test api routes use `insomnia`


## Technologies
* Node.js
* Express.js
* Javascript
* MongoDB
* Mongoose
* Insomnia

## Testing
`Insomnia` is used to test the REST API calls.

### User API Routes
* Creating new User: POST `/api/users`
* Getting all Users: GET `api/users`
* Getting a single User: GET `/api/users/:userId`
* Update User: PUT `api/users/:userId`
* Delete User: Delete `api/users/:userId`
### Friend API Routes
* Add new friend: POST `api/users/:userId/friends/friendId`
* Delete a friend: DELETE `api/users/:userId/friends/friendId`
### Thought API Routes
* create a thought: POST `/api/thoughts/`
* Get all thoughts: GET `/api/thoughts/`
* Get a single thought: GET `/api/thoughts/:thoughtId`
* Update a thought: PUT `/api/thoughts/:thoughtId`
* Delete a thought: DELETE `/api/thoughts/:thoughtId`
### Reaction API Routes
* Create a reaction: POST `/api/thoughts/:thoughtId/reactions`
* Delete a reaction: DELETE `/api/thoughts/:thoughtId/reactions/:reactionId

## Credits
Chris Cota
