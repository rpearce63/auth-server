const Authentication = require("./controllers/authentication");
// imported just to make sure the code gets executed.  jwt and local login
// strategies are set into passport at the bottom of passportService.
// They then referenced below when setting authenticate middlware 'requireAuth'
// and 'requireSignin'.
require("./services/passport");
const passport = require("passport");

const reqiureAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });
module.exports = function(app) {
  app.get("/", reqiureAuth, function(req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
};
