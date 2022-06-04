import { serialize } from "cookie";
import { NextApiHandler } from "next";
import { emailPattern } from "~/misc/pat";
import { Courier } from "~/services/_courier";
import { Postgres } from "~/services/_postgres";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const courierBrand = process.env.COURIER_BRAND_ID;
const courierEvent = process.env.COURIER_EVENT_ID;
const courierOverrides = {
  smtp: {
    config: {
      auth: {
        user: smtpUser!,
        pass: smtpPass!,
      },
      secure: true,
      host: smtpHost!,
      port: Number(smtpPort!),
    },
  },
};

const join: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() === "post") {
    const { email } = JSON.parse(req.body) as { email?: string; };
    if (!email) {
      return res.status(400).json("no email provided");
    }

    if (emailPattern.test(email)) {
      try {
        const pg = await Postgres.createOrGet();
        const { rows } = await pg?.query("SELECT * FROM waitlist WHERE email = $1", [req.body.email])!;
        if (!!rows[0]) {
          return res.status(403).json("email is already registered");
        }

        await pg?.query("INSERT INTO waitlist (email) VALUES ($1)", [email]);
        // Only sending an actual message in production environment.
        if (process.env.NODE_ENV === "production") {
          try {
            const courier = Courier.createOrGet();
            await courier.send({ profile: { email }, recipientId: email!, brand: courierBrand!, eventId: courierEvent!, override: courierOverrides });
          } catch (error) {
            console.error(error);
          }
        }

        return res.status(200).setHeader("Set-Cookie", serialize("joined", String(1), { path: "/" })).json(null);
      } catch (error) {
        console.error(error);
        return res.status(500).json("internal error");
      }
    }

    return res.status(400).json("invalid email address");
  };

  return res.status(405).json("method not allowed");
};

export default join;

