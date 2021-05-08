const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newIndividPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newIndividPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: "No posts found with this id!" });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {

    const PostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const post = PostData.get({ plain: true });

    res.render("individual-post", {
      ...post,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
