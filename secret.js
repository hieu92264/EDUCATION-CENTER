import crypto from "crypto";
import fs from "fs";

const jwtSecret = crypto.randomBytes(32).toString("hex");

fs.appendFile(".env", `\nJWT_SECRET=${jwtSecret}`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("JWT :>>>> ", jwtSecret);
  }
});
