const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  const userData = await Post.create(req.body);
  res.json(userData);
});

module.exports = router;
