const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "Wow, that makes a lot of sense!",
    user_id: "2",
    post_id: "3"
  },
  {
    comment_text: "That is an interesting take.",
    user_id: "3",
    post_id: "5"
  },
  {
    comment_text: "Cool idea.",
    user_id: "4",
    post_id: "1"
  },
  {
    comment_text: "I will take that advice!",
    user_id: "2",
    post_id: "4"
  },
  {
    comment_text: "Crazy thought!!",
    user_id: "5",
    post_id: "2"
  },
  {
    comment_text: "I think a lot fo people would agree.",
    user_id: "1",
    post_id: "5"
  },
  {
    comment_text: "I think so too!",
    user_id: "3",
    post_id: "4"
  },
  {
    comment_text: "Really? Interesting!",
    user_id: "4",
    post_id: "1"
  }
]

const seedComment = () => Comment.bulkCreate(commentData);


module.exports = seedComment;