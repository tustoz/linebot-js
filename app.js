// import all environtment lib: express, line bot sdk
const express = require("express");
const line = require("@line/bot-sdk");
const app = express();
require("dotenv").config();

// bot config
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// router endpoint, oauth, json result
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

// setup client
const client = new line.Client(config);

// handle event
function handleEvent(event) {
  if (event.type === "message" || event.message === "halo") {
    return client.replyMessage(event.replyToken, {
      type: "sticker",
      packageId: "1",
      stickerId: "1"
    });
  }
}

// app listen port
app.listen(3000);
