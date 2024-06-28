const { Post } = require('../models');

const postData = [
  {
    post_title: "",
    post_text: "",
    user_id: "",
  },
  {
    post_title: "",
    post_text: "",
    user_id: "",
  },
  {
    post_title: "",
    post_text: "",
    user_id: "",
  },
  {
    post_title: "",
    post_text: "",
    user_id: "",
  },
  {
    post_title: "",
    post_text: "",
    user_id: "",
  },
]

const seedPost = () => Post.bulkCreate(postData);


module.exports = seedPost;