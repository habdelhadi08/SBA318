const express= require('express')
const port= 3000
const app = express();
const bodyParser = require("body-parser");
const error = require("./utilities/error")
const users = require("./routes/users");
const posts= require("./routes/posts");
const comments = require("./routes/comments");
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
// Using Middlewaare
app.use((req, res, next) => {
    const time = new Date();
    console.log(
      `${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });
  // using API
  apiKeys = ["javascript", "react", "express"];
app.use("/api", function (req, res, next) {
    const key = req.query["api-key"];
    if (!key) next(error(400, "API Key Required"))
    if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"))
    req.key = key;
    next();
  });

app.use(express.static("public"))
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.get("/", (req, res) => {
    res.send("Hello!!");
  });

// 404 Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({error: err.message})
  });

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });