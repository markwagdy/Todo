const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Todo.associate = (models) => {
  Todo.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};
module.exports = Todo;
