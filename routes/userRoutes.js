const express = require('express');
const userRouter = express.Router();
const { validateRequest } = require('../commonMethods');
const { createUserValidationSchema } = require('../validations/validationSchemas');
const User = require('../models/users');
const { Op } = require('sequelize'); 
const Todo = require('../models/todo');

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
            const users = await User.findAll({include:[{model:Todo,as:'todos'}]});

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
