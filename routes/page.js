const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User } = require("../models");

const router = express.Router();

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird", user: null });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입 - NodeBird",
    user: req.user,
    joinError: req.flash("joinError")
  });
});

router.get("/", (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ["id", "nick"]
    }
  }).then(post => {
    res.render("main", {
      title: "NodeBird",
      twits: post,
      user: req.user,
      loginError: req.flash("loginError")
    });
  });
});

module.exports = router;
