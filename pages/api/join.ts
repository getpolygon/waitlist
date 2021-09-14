import pgp from "../../utils/pgp";
import { NextApiHandler } from "next";
import Response, { Status } from "../../utils/Response";
import { email as emailPattern } from "../../utils/patterns";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = JSON.parse(req.body);

    if (!email) {
      return res
        .status(400)
        .json(Response(Status.ERR, "Email was not provided"));
    } else {
      if (emailPattern.exec(email)) {
        try {
          // Insert the new email to the waitlist table
          await pgp.any("INSERT INTO waitlist (email) VALUES ($1)", [email]);

          return res
            .status(200)
            .json(Response(Status.OK, "Successfully joined the waitlist"));
        } catch (error: any) {
          // Same email registered twice
          if (error.code === "23505")
            return res
              .status(200)
              .json(Response(Status.ERR, "Email is already registered"));

          return res
            .status(500)
            .json(Response(Status.ERR, "There was an error"));
        }
      } else return res.status(400).json(Response(Status.ERR, "Invalid email"));
    }
  } else return res.status(404).json(Response(Status.ERR, "Not Found"));
};

export default handler;
