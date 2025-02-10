const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const { validateRequest } = require('../commonMethods');
const { createUserValidationSchema } = require('../validations/validationSchemas');
const User = require('../models/users');
const { Op } = require('sequelize'); 
const Todo = require('../models/todo');

const SECRET_KEY = process.env.JWT_SECRET

// ✅ Register User
userRouter.post('/', validateRequest(createUserValidationSchema), async (req, res) => {
    const { userName, password, email } = req.body;

    try {
        const [user, created] = await User.findOrCreate({
            where: {
                [Op.or]: [{ user_name: userName }, { email: email }]
            },
            defaults: {
                user_name: userName,
                email: email,
                password: password
            }
        });

        if (!created) {
            return res.status(400).json({ message: 'User Name or Email already exists' });
        }

        return res.json({ message: 'User Created Successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ✅ Login API
userRouter.post('/login', async (req, res) => {
    const { username: username, password } = req.body;

    try {
        const user = await User.findOne({ where: { user_name: username } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, userName: user.user_name }, SECRET_KEY, { expiresIn: '1h' });

        return res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ✅ Get Users with Todos
userRouter.get('/:id?', async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const user = await User.findByPk(id, {
                include: [{ model: Todo, as: 'todos' }]
            });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID.' });
            }

            return res.status(200).json({
                message: 'User Found',
                data: user  
            });
        } else {
            const users = await User.findAll({ include: [{ model: Todo, as: 'todos' }] });

            return res.status(200).json({
                message: 'Successfully found users',
                data: users
            });
        }
    } catch (error) {
        console.error('Error fetching user(s):', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = userRouter;
