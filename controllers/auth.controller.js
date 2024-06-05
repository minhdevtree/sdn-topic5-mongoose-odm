const { loginSchema } = require('../configs/validation.config');
const db = require('../models/index');
const createError = require('http-errors');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { email, password } = loginSchema.parse(req.body);

            const user = await db.user.findOne({ email });

            if (!user) {
                throw createError(404, 'User not found');
            }
            if (password !== user.password) {
                throw createError.Unauthorized('Username/password not valid');
            }

            return res.json({
                user: { email: user.email, role: user.role, type: user.type },
            });
        } catch (error) {
            if (error.errors) {
                const errors = Object.values(error.errors).map(
                    err => err.message
                );
                error = createError(422, { message: errors.join(', ') });
            }
            next(error);
        }
    },
    register: async (req, res, next) => {
        try {
            const { email, password } = loginSchema.parse(req.body);
            const user = await db.user.findOne({ email });

            if (user) {
                throw createError(409, 'User already exists');
            }

            await db.user.create({ email, password });
            res.status(201).json({ message: 'User created' });
        } catch (error) {
            if (error.errors) {
                const errors = Object.values(error.errors).map(
                    err => err.message
                );
                error = createError(422, { message: errors.join(', ') });
            }
            next(error);
        }
    },
};
