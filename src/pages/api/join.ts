import pg from "utils/pg";
import { serialize } from "cookie";
import { NextApiHandler } from "next";
import { courier } from "utils/courier";
import { isEqual, isNil, nth } from "lodash";
import Response, { Status } from "utils/Response";
import { email as emailPattern } from "utils/patterns";

const nodeEnv = process.env.NODE_ENV;
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const courierBrand = process.env.COURIER_BRAND_ID;
const courierEvent = process.env.COURIER_EVENT_ID;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    // If email was not provided
    if (isNil(email)) {
      return res
        .status(400)
        .json(new Response(Status.ERR, "Email was not provided"));
    }

    // If the email is valid
    if (emailPattern.exec(email)) {
      try {
        // Checking whether there's a duplicate
        const { rows: data } = await pg.query(
          "SELECT * FROM waitlist WHERE email = $1",
          [email]
        );

        // If there is an entry with the specified email
        if (!isNil(nth(data, 0)))
          return res
            .status(403)
            .json(new Response(Status.OK, "This email was already registered"));

        // Insert the email
        await pg.query("INSERT INTO waitlist (email) VALUES ($1)", [email]);

        // Only sending an email in production
        if (isEqual(nodeEnv, "production")) {
          // Send an email
          await courier
            .send({
              brand: courierBrand!!,
              eventId: courierEvent!!,
              recipientId: email,
              profile: {
                email,
              },
              override: {
                smtp: {
                  config: {
                    auth: {
                      user: smtpUser!!,
                      pass: smtpPass!!,
                    },
                    secure: true,
                    host: smtpHost!!,
                    port: Number(smtpPort!!),
                  },
                },
              },
            })
            .catch(console.error);
        }

        return res
          .status(200)
          .setHeader("Set-Cookie", serialize("joined", "true", { path: "/" }))
          .json(new Response(Status.OK, "Successfully joined the waitlist"));
      } catch (error) {
        console.error(error);
        // Internal server error
        return res
          .status(500)
          .json(new Response(Status.ERR, "There was an error"));
      }
    }

    // If the email is invalid
    return res.status(400).json(new Response(Status.ERR, "Invalid email"));
  }

  // No matching HTTP method
  return res.status(404).json(new Response(Status.ERR, "Not Found"));
};

export default handler;
