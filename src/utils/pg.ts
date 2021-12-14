import { Pool } from "pg";

const pg = new Pool({ connectionString: process.env.POSTGRES_URL });
pg.connect().catch(console.error);

export default pg;
