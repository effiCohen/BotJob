
const indexR = require("./index");
const usersR = require("./users");
const emailR = require("./email");
const questionsR = require("./questions");
const interviewsR = require("./interviews");
const gptR = require("./gpt");
const jobsR = require("./jobs")

exports.corsAccessControl = (app) => {
  app.all("*", function (req, res, next) {
    if (!req.get("Origin")) return next();
    res.set("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.set(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,auth-token,x-api-key"
    );
    next();
  });
};

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/questions", questionsR);
  app.use("/interviews", interviewsR);
  app.use("/email", emailR);
  app.use("/gpt", gptR);
  app.use("/jobs", jobsR);
  app.use((req, res) => {
    res.status(404).json({ msg_error: "Url not found , 404!" });
  });
};

