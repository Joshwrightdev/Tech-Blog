const router = require("express").Router();

const userRoutes = require("./user-routes");
const createPostRoutes = require("./createpost-routes");
const postRoutes = require("./individual-post-routes");

router.use("/users", userRoutes);
router.use("/createdposts", createPostRoutes);

router.use("/posts", postRoutes);

module.exports = router;
