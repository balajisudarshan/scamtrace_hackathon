import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `UPDATE "User" SET role='ADMIN' WHERE email LIKE '%gadiparthi%' OR email LIKE '%balaji%' OR email LIKE '%wonder%' OR email LIKE '%kondreddy%' RETURNING email, role`
    );
    console.log("Updated users to ADMIN:", res.rows);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
