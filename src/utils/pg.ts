import { Pool } from "pg";

const connectionString = process.env.POSTGRES_URL;
const pg = new Pool({ connectionString });
pg.connect().catch(console.error);

export default pg;
