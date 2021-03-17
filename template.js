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
  // image
  if (event.type === "message" && event.message.text === "image") {
    return client.replyMessage(event.replyToken, {
      type: "image",
      originalContentUrl: "https://example.com/original.jpg",
      previewImageUrl: "https://example.com/preview.jpg",
    });
  }

  // audio
  if (event.type === "message" && event.message.text === "audio") {
    return client.replyMessage(event.replyToken, {
      type: "audio",
      originalContentUrl: "https://example.com/original.m4a",
      duration: 60000,
    });
  }

  // Buttons template message example
  if (event.type === "message" && event.message.text === "buttons") {
    return client.replyMessage(event.replyToken, {
      type: "template",
      altText: "This is a buttons template",
      template: {
        type: "buttons",
        thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#FFFFFF",
        title: "Menu",
        text: "Please select",
        defaultAction: {
          type: "uri",
          label: "View detail",
          uri: "http://example.com/page/123",
        },
        actions: [
          {
            type: "postback",
            label: "Buy",
            data: "action=buy&itemid=123",
          },
          {
            type: "postback",
            label: "Add to cart",
            data: "action=add&itemid=123",
          },
          {
            type: "uri",
            label: "View detail",
            uri: "http://example.com/page/123",
          },
        ],
      },
    });
  }

  // carousel template message example
  if (event.type === "message" && event.message.text === "carousel") {
    return client.replyMessage(event.replyToken, {
      type: "template",
      altText: "this is a carousel template",
      template: {
        type: "carousel",
        columns: [
          {
            thumbnailImageUrl: "https://example.com/bot/images/item1.jpg",
            imageBackgroundColor: "#FFFFFF",
            title: "this is menu",
            text: "description",
            defaultAction: {
              type: "uri",
              label: "View detail",
              uri: "http://example.com/page/123",
            },
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=111",
              },
              {
                type: "postback",
                label: "Add to cart",
                data: "action=add&itemid=111",
              },
              {
                type: "uri",
                label: "View detail",
                uri: "http://example.com/page/111",
              },
            ],
          },
          {
            thumbnailImageUrl: "https://example.com/bot/images/item2.jpg",
            imageBackgroundColor: "#000000",
            title: "this is menu",
            text: "description",
            defaultAction: {
              type: "uri",
              label: "View detail",
              uri: "http://example.com/page/222",
            },
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=222",
              },
              {
                type: "postback",
                label: "Add to cart",
                data: "action=add&itemid=222",
              },
              {
                type: "uri",
                label: "View detail",
                uri: "http://example.com/page/222",
              },
            ],
          },
        ],
        imageAspectRatio: "rectangle",
        imageSize: "cover",
      },
    });
  }

  //Image carousel template message example
  if (event.type === "message" && event.message.text === "imagecarousel") {
    return client.replyMessage(event.replyToken, {
      type: "template",
      altText: "this is a image carousel template",
      template: {
        type: "image_carousel",
        columns: [
          {
            imageUrl: "https://example.com/bot/images/item1.jpg",
            action: {
              type: "postback",
              label: "Buy",
              data: "action=buy&itemid=111",
            },
          },
          {
            imageUrl: "https://example.com/bot/images/item2.jpg",
            action: {
              type: "message",
              label: "Yes",
              text: "yes",
            },
          },
          {
            imageUrl: "https://example.com/bot/images/item3.jpg",
            action: {
              type: "uri",
              label: "View detail",
              uri: "http://example.com/page/222",
            },
          },
        ],
      },
    });
  }

  // flex message
  if (event.type === "message" && event.message.text === "flex") {
    return client.replyMessage(event.replyToken, {
      type: "flex",
      altText: "this is a flex message",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "hello",
            },
            {
              type: "text",
              text: "world",
            },
          ],
        },
      },
    });
  }

  // bubble error
  //   if (event.type === "message" && event.message.text === "bubble") {
  //     return client.replyMessage(event.replyToken, {
  //       type: "bubble",
  //       header: {
  //         type: "box",
  //         layout: "vertical",
  //         contents: [
  //           {
  //             type: "text",
  //             text: "Header text",
  //           },
  //         ],
  //       },
  //       hero: {
  //         type: "image",
  //         url: "https://example.com/flex/images/image.jpg",
  //       },
  //       body: {
  //         type: "box",
  //         layout: "vertical",
  //         contents: [
  //           {
  //             type: "text",
  //             text: "Body text",
  //           },
  //         ],
  //       },
  //       footer: {
  //         type: "box",
  //         layout: "vertical",
  //         contents: [
  //           {
  //             type: "text",
  //             text: "Footer text",
  //           },
  //         ],
  //       },
  //       styles: {
  //         comment: "See the example of a bubble style object",
  //       },
  //     });
  //   }

  // carousel example error
  //   if (event.type === "message" && event.message.text === "carousel2") {
  //     return client.replyMessage(event.replyToken, {
  //       type: "carousel",
  //       contents: [
  //         {
  //           type: "bubble",
  //           body: {
  //             type: "box",
  //             layout: "vertical",
  //             contents: [
  //               {
  //                 type: "text",
  //                 text: "First bubble",
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           type: "bubble",
  //           body: {
  //             type: "box",
  //             layout: "vertical",
  //             contents: [
  //               {
  //                 type: "text",
  //                 text: "Second bubble",
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     });
  //   }

  // box example
  //   if (event.type === "message" && event.message.text === "box") {
  //     return client.replyMessage(event.replyToken, {
  //       type: "bubble",
  //       body: {
  //         type: "box",
  //         layout: "vertical",
  //         contents: [
  //           {
  //             type: "image",
  //             url: "https://example.com/flex/images/image.jpg",
  //           },
  //           {
  //             type: "separator",
  //           },
  //           {
  //             type: "text",
  //             text: "Text in the box",
  //           },
  //           {
  //             type: "box",
  //             layout: "vertical",
  //             contents: [],
  //             width: "30px",
  //             height: "30px",
  //             background: {
  //               type: "linearGradient",
  //               angle: "90deg",
  //               startColor: "#FFFF00",
  //               endColor: "#0080ff",
  //             },
  //           },
  //         ],
  //         height: "400px",
  //         justifyContent: "space-evenly",
  //         alignItems: "center",
  //       },
  //     });
  //   }

  // button error
  //   if (event.type === "message" && event.message.text === "button") {
  //     return client.replyMessage(event.replyToken, {
  //       type: "button",
  //       action: {
  //         type: "uri",
  //         label: "Tap me",
  //         uri: "https://example.com",
  //       },
  //       style: "primary",
  //       color: "#0000ff",
  //     });
  //   }

  // image example error
  //   if (event.type === "message" && event.message.text === "image example") {
  //     return client.replyMessage(event.replyToken, {
  //       type: "image",
  //       url: "https://example.com/flex/images/image.jpg",
  //       size: "full",
  //       aspectRatio: "1.91:1",
  //     });
  //   }

  // icon error
  //   if (event.type === "message" && event.message.text === "icon") {
  //     return client.replyMessage(event.replyToken, {
  //       type: "icon",
  //       url: "https://example.com/icon/png/caution.png",
  //       size: "lg",
  //       aspectRatio: "1.91:1",
  //     });
  //   }

  // text
  if (event.type === "message" && event.message.text === "texts") {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "Hello, World!",
      size: "xl",
      weight: "bold",
      color: "#0000ff",
    });
  }

  // span error
  //   if (event.type === "message" && event.message.text === "span") {
  //     return client.replyMessage(event.replyToken, {
  //       type: "span",
  //       text: "its span text",
  //       size: "xxl",
  //       weight: "bold",
  //       style: "italic",
  //       color: "#4f8f00",
  //     });
  //   }
}

// app listen port
app.listen(3000);
