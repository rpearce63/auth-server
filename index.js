const express = require("express");
const mongoose = require("mongoose");
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//const os = require("os");
//console.log("temp dir: ", os.tmpdir);
app.use(morgan("dev")); // log every request to the console
app.use(cors());
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

require("./router")(app);
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
  app.listen("3090", function(err) {
    if (err) throw err;
    console.log("App listening on port " + "3090");
  });
});
