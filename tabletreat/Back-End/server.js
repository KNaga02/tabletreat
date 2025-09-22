import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
const PORT = 5174;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_GMAIL@gmail.com",
        pass: "YOUR_APP_PASSWORD", 
      },
    });

    await transporter.sendMail({
      from: "YOUR_GMAIL@gmail.com",
      to: email,
      subject: "TableTreat OTP Verification",
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
