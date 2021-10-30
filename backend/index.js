const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Creating App
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.post("/send_mail", async (req, res) => {
  try {
    const { name, user, toList, ccList, bccList, pass, subject, text } =
      req.body;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${name} <${user}>`,
      to: toList,
      cc: ccList,
      bcc: bccList,
      subject: subject, // Subject line
      text: text ? text : "", // plain text body
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return res.status(200).send({ success: "Email Sent Successfully" });
  } catch (e) {
    return res.status(500).send({ error: "Check your credentials" });
  }
});

// Listening
app.listen(port, () => {
  console.log(`Mail System Backend is listening at http://localhost:${port}`);
});
