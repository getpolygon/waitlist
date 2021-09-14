import _pgp from "pg-promise";

const pgp = _pgp({
  noWarnings: true,
});
const postgres = pgp(process.env?.DATABASE_URL!!);

export default postgres;
