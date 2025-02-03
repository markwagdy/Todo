const { Sequelize } = require("sequelize");
require("dotenv").config();

const testDbName = process.env.TEST_DB_NAME;
const rootSequelize = new Sequelize(
  "", // No database initially
  process.env.TEST_DB_USER,
  process.env.TEST_DB_PASSWORD,
  {
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT,
    logging: console.log,
  }
);

async function dropTestDB() {
  try {
    await rootSequelize.query(`DROP DATABASE IF EXISTS ${testDbName};`);
    console.log(`✅ Test database '${testDbName}' dropped.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error dropping test database:", error);
    process.exit(1);
  }
}

dropTestDB();
