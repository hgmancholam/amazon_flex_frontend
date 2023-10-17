import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { SECRET_MAIL_PASSWORD } from "../../../globals.jsx";

export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();
  //   console.log(email);
  const transport = nodemailer.createTransport({
    service: "gmail",
    /* 
      setting service as 'gmail' is same as providing these setings:

      host: "smtp.gmail.com",
      port: 465,
      secure: true

      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
      user: process.env.SECRET_EMAIL,
      pass: SECRET_MAIL_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.SECRET_EMAIL,
    to: "hgmancholam@gmail.com",
    subject: `EASYBOT: Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          // console.log("MAL: " + err.message);
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent succesfully" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
