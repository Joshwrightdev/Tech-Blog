const router = require("express").Router();
const { User, Post, postHistory } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  // console.log(req.session);

  const userData = await User.findOne({ where: { id: req.session.user_id } });

  const user = userData.get({ plain: true });


  res.render("homepage", {
    loggedIn: req.session.logged_in,
    user
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/allposts", async (req, res) => {
  try {
    if (req.session.logged_in !== true) {
      res.redirect("/login");
      return;
    }

    const PostData = await Post.findAll();

    console.log(req.session.logged_in);
    const posts = PostData.map((Post) => Post.get({ plain: true }));

    res.render("all-posts", {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/createpost", (req, res) => {
  if (req.session.logged_in !== true) {
    res.redirect("/login");
    return;
  }

  res.render("createpost", {
    loggedIn: req.session.logged_in,
  });
});
module.exports = router;
