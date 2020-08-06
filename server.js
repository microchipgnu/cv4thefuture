const express = require("express");
const bodyParser = require("body-parser");
const { request, GraphQLClient } = require("graphql-request");

const { GetAnswers, InsertAnswers } = require("./queries");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const client = new GraphQLClient(process.env.HASURA_ENDPOINT, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-hasura-admin-secret": process.env.HASURA_TOKEN,
  },
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/studio", (request, response) => {
  response.sendFile(__dirname + "/views/studio.html");
});

app.get("/facts", (request, response) => {
  response.json([
    {
      title: "Skateboarding is one of my passion hobbies!",
      description: "Feed me with your feedback",
      type: "personal",
      link: "",
      media: "",
      animation: "",
    },
    {
      title: "I have built multiple applications.",
      description: "Feed me with your feedback",
      type: "work",
      link: "",
      media: "",
      animation: "",
    },
    {
      title:
        "I have won TEN THOUSAND EUROS on a hackathon organized by Mercedes-Benz.io",
      description: "Feed me with your feedback",
      type: "achievements",
      link: "",
      media: "",
      animation: "",
    },
    {
      title: "I practiced ballet for 7 years. Went to the national school.",
      description: "Feed me with your feedback",
      type: "personal",
      link: "",
      media: "",
      animation: "",
    },
  ]);
});

app.post("/answer", async (request, response) => {
  const ip = (
    request.headers["x-forwarded-for"] || request.connection.remoteAddress
  )
    .split(",")[0]
    .trim();

  const toInsert = {
    answer: { ...request.body },
    ip,
  };

  try {
    await client.request(InsertAnswers, toInsert).then((data) => {
      response.json({});
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/cv", (request, response) => {
  response.download("luis-microchipgnu-cv.pdf");
});

app.get("/answers", async (request, response) => {
  try {
    await client.request(GetAnswers).then((data) => {
      let toReturn = {
        totalAnswers: data.answers.length,
      };

      for (const groupAnswers of data.answers) {
        for (const answer of groupAnswers.answer) {
          const id = answer[0].id;
          const reponse = answer[0].answer;

          if (reponse === "up") {
            toReturn = {
              ...toReturn,
              [id]: {
                up: 10,
                down: 10,
              },
            };
          }
        }
      }

      response.json(toReturn);
    });
  } catch (e) {
    console.log(e);
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
