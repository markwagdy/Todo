const Sequelize=require('sequelize')
const todo=require('../models/todo')

require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging:false
    }
  );
// Test Connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Unable to connect to the database:', err));

  sequelize.sync({ force: false })  // Change to "true" to drop and recreate tables
  .then(() => console.log("✅ Tables created!"))
  .catch(err => console.error("❌ Error creating tables:", err))


module.exports = { sequelize };