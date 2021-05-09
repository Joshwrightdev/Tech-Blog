const router = require("express").Router();
const { User, Post } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// If someone goes to api/users/Posts we'll render the my-Posts template.
// ** WILL NEED TO UPDATE ONCE WE GET SOME DATA SO WE CAN PASS THAT DOWN TO THE MY-PostS TEMPLATE.
router.get("/posts", async (req, res) => {
  try {
    if (req.session.logged_in !== true) {
      res.redirect("/login");
      return;
    }

    const PostData = await Post.findAll({
      where: {
        // owner_id: 1,
        user_id: req.session.user_id,
      },
    });

    console.log(req.session.logged_in);
    const Post = PostData.map((Post) => Post.get({ plain: true }));

    res.render("my-posts", {
      Post,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
