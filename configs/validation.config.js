const { z } = require('zod');

const userSchema = z.object({
    email: z
        .string({ required_error: 'Email can not empty' })
        .email({ message: 'Email must be a valid email' }),
    password: z
        .string({ required_error: 'Password can not empty' })
        .min(8, { message: 'Password must be at least 6 characters' }),
    role: z.enum(['user', 'admin']).default('user'),
    type: z.enum(['local', 'facebook', 'google']).default('local'),
});

const loginSchema = z.object({
    email: z
        .string({
            required_error: 'Email can not empty',
        })
        .email({
            message: 'Invalid email',
        }),
    password: z
        .string({
            required_error: 'Password can not empty',
        })
        .min(6, { message: 'Password must be at least 6 characters' }),
});

const registerSchema = z.object({
    email: z
        .string({
            required_error: 'Email can not empty',
        })
        .email({
            message: 'Invalid email',
        }),
    password: z
        .string({
            required_error: 'Password can not empty',
        })
        .min(6, { message: 'Password must be at least 6 characters' }),
});

module.exports = { userSchema, loginSchema };
