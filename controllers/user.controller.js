const db = require('../models');

const User = db.user;

async function create(req, res, next) {
    try {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
        });

        const user = await newUser.save();
        res.status(201).send({
            message: 'User created',
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

async function editById(req, res, next) {
    try {
        const { id } = req.params;

        const { email, password, role, type } = req.body;

        const newUser = await User.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                email,
                password,
                role,
                type,
            },
            {
                new: true,
            }
        );

        res.status(200).send({
            message: 'User updated',
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
}

async function deleteById(req, res, next) {
    try {
        const { id } = req.params;

        const deleteUser = await User.findByIdAndDelete({
            _id: id,
        });

        res.status(200).send({
            message: 'User deleted',
            data: deleteUser,
        });
    } catch (error) {
        next(error);
    }
}

async function getAll(req, res, next) {
    try {
        const users = await User.find({});

        res.status(200).send({
            message: 'Get all user',
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

async function findByEmail(req, res, next) {
    try {
        const { email } = req.params;

        const user = await User.findOne({
            email,
        });

        res.status(200).send({
            message: 'Get user by email',
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

const userController = {
    create,
    editById,
    deleteById,
    getAll,
    findByEmail,
};

module.exports = userController;
