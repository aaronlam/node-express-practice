var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "首页" });
});

router.get("/login", function (req, res) {
  res.render("login", { title: "用户登录" });
});

router.post("/login", function (req, res) {
  var user = {
    username: "admin",
    password: "admin",
  };

  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    req.session.user = user;

    res.redirect("/home");
  }

  req.session.error = "用户名或者密码不正确，请重新输入！";

  res.redirect("/login");
});

router.get("/logout", function (req, res) {
  req.session.user = null;

  res.redirect("/");
});

router.get("/home", function (req, res) {
  var user = req.session.user;
  if (!user) {
    res.redirect("/login");
  }

  res.render("home", {
    title: "Home",
  });
});

module.exports = router;
