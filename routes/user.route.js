const express = require('express');
const userRouter = express.Router();
const { UserController } = require('../controllers');

// Route: /users/create
userRouter.post('/create', UserController.create);

// Route: /users/edit/:id
userRouter.put('/edit/:id', UserController.editById);

// Route: /users/delete/:id
userRouter.delete('/delete/:id', UserController.deleteById);

// Route: /users/list
userRouter.get('/list', UserController.getAll);

// Route: /users/find/:email
userRouter.get('/find/:email', UserController.findByEmail);

module.exports = userRouter;
