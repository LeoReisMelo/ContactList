const express = require('express');

const UsersController = require('./controllers/UsersController');
const routes = express.Router();

routes.post('/users', UsersController.create);

routes.get('/users',UsersController.index);

routes.patch('/users/:id', UsersController.update);

routes.delete('/users/:id', UsersController.delete);

module.exports = routes;