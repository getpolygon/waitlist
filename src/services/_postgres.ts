import pg from "pg";

type __PgPoolClient = pg.PoolClient | null | undefined;

const connectionString = process.env.POSTGRES_URL;

export class Postgres {
    public static __client: __PgPoolClient

    public static async createOrGet(): Promise<__PgPoolClient> {
        if (typeof window !== "undefined") {
            throw new Error("usage of pg on client-side is forbidden")
        }

        // Checking if the postgres pool is undefined or null.
        if (!Postgres.__client) {
            const pool = new pg.Pool({ connectionString });
            Postgres.__client = await pool.connect();
        }

        return Postgres.__client;
    }
}

