import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  //   let testAccount = await nodemailer.createTestAccount();
  //   console.log("testAccount", testAccount);

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "fredy.emard34@ethereal.email", //testAccount.user,
      pass: "jR9jzP62SExfpam11g", //testAccount.pass,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: "Change password", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}
