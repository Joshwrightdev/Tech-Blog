const User = require("./User");
const Post = require("./Post");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "owner_id",
});


module.exports = { User, Post };
