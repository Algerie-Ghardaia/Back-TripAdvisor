const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const mailgun = new Mailgun(formData);

const client = mailgun.client({
    username: process.env.USER_NAME,
    key: process.env.USER_KEY,
});

app.get("/", (req, res) => {
  res.json({ message: "salut !" });
});

app.post("/form", async (req, res) => {
     console.log(req.body);

  try {
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: process.env.USER_EMAIL,
      subject: "Bonjour DJani",
      text: `${req.body.message}`,
    };

    const response = await client.messages.create(
        process.env.USER_DOMAINE,
      messageData
    );

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("server started 🚀🚀🚀");
});