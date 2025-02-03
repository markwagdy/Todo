const { Sequelize } = require("sequelize");
require("dotenv").config();

const testDbName =   process.env.TEST_ENV?process.env.TEST_DB_NAME:process.env.DB_NAME;// Should be `todo_test_db`
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log,
  }
);

// Root Sequelize instance to create/drop databases
const testSequelize = new Sequelize(
  "",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log,
  }
);

async function initializeTestDB() {
  try {
    // Create the database if it doesn’t exist
    await testSequelize.query(`CREATE DATABASE IF NOT EXISTS ${testDbName};`);
    console.log(`✅ Test database '${testDbName}' created.`);

    // Sync tables (force: true drops and recreates tables)
    await sequelize.sync({ force: true });
    console.log("✅ Test tables created!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting up test database:", error);
    process.exit(1);
  }
}

initializeTestDB();
