module.exports = function (app, passport) {
  //  home page

  app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  //  login form

  app.get("/login", (req, res) => {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  //  process sign-up

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  //  protected routes
  app.get("/profile", (req, res) => {
    res.render("profile.ejs", {
      user: req.user,
    });
  });

  //  logout

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //  middleware to make sure a user is logged in

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
};
