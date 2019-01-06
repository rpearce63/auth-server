const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

// for mocking the actual mongodb connection
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

mockgoose.helper.setDbVersion("3.2.1");
mockgoose.prepareStorage().then(function() {
  console.log("setting up mockgoose connection");
  // mongoose connection
  mongoose
    .connect(
      "mongodb://rpearce63:5778o62%40Ml@ds133570.mlab.com:33570/auth-tutorial",
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Mongoose default connection open to mongodb");
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
});

// App setup
app.use(morgan("combined")); // log every request to the console
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: "*/*" })); // parse application/vnd.api+json as json
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("App listening on port " + port);
