import { Pool } from "pg";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from both files
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

// Validate environment variables
const requiredEnvVars = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:", missingVars);
  process.exit(1);
}

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

async function testDatabaseConnection() {
  // Log config (without password)
  console.log("🔧 Testing connection with config:", {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user,
    password: "******",
  });

  const pool = new Pool(dbConfig);

  try {
    // Test connection
    const client = await pool.connect();
    console.log("✅ Successfully connected to the database");

    // Test query
    const result = await client.query("SELECT NOW() as current_time");
    console.log("📅 Current database time:", result.rows[0].current_time);

    // Test table creation
    await client.query(`
            CREATE TABLE IF NOT EXISTS test_connection (
                id SERIAL PRIMARY KEY,
                test_column VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    console.log("✅ Test table created");

    // Test data insertion
    await client.query(
      `
            INSERT INTO test_connection (test_column) 
            VALUES ($1)
        `,
      ["Test successful"]
    );
    console.log("✅ Test data inserted");

    // Test data retrieval
    const testData = await client.query("SELECT * FROM test_connection");
    console.log("📋 Retrieved test data:", testData.rows);

    // Cleanup
    await client.query("DROP TABLE test_connection");
    console.log("🧹 Test table cleaned up");

    client.release();
  } catch (error) {
    console.error("❌ Database test failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the test
console.log("🔄 Starting database connection test...");
testDatabaseConnection()
  .then(() => {
    console.log("✨ All database tests completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });
