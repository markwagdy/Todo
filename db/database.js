const Sequelize = require('sequelize');
require('dotenv').config();

const isTestEnv = process.env.NODE_ENV===true ? true:false;

const sequelize = new Sequelize(
  isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  isTestEnv ? process.env.TEST_DB_USER : process.env.DB_USER,
  isTestEnv ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD,
  {
    host: isTestEnv ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    dialect: isTestEnv ? process.env.TEST_DB_DIALECT : process.env.DB_DIALECT,
    logging: console.log,
  }
);

// Test Connection
sequelize
  .authenticate()
  .then(() => console.log(`✅ Database connected: ${isTestEnv ? 'Test' : 'Development'}`))
  .catch((err) => console.error('❌ Unable to connect to the database:', err));

sequelize
  .sync({ force: isTestEnv })  // Drops and recreates tables only in test mode
  .then(() => console.log('✅ Tables created!'))
  .catch((err) => console.error('❌ Error creating tables:', err));

module.exports = { sequelize };