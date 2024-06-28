const { Comment } = require('../models');

const commentData = [
  {
    comment_title: "",
    comment_text: "",
    user_id: "",
    post_id: ""
  },
  {
    comment_title: "",
    comment_text: "",
    user_id: "",
    post_id: ""
  },
  {
    comment_title: "",
    comment_text: "",
    user_id: "",
    post_id: ""
  },
  {
    comment_title: "",
    comment_text: "",
    user_id: "",
    post_id: ""
  },
  {
    comment_title: "",
    comment_text: "",
    user_id: "",
    post_id: ""
  },
]

const seedComment = () => Comment.bulkCreate(commentData);


module.exports = seedComment;