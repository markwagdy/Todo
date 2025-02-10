// migrations/YYYYMMDDHHMMSS-add-userId-to-todo.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Todos', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the referenced table
        key: 'id', // Primary key of the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Todos', 'userId');
  },
};