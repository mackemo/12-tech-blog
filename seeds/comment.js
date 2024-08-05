const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "Wow, that makes a lot of sense!",
    comment_date: new Date('2022-04-13'), 
    user_id: "2",
    post_id: "3"
  },
  {
    comment_text: "That is an interesting take.",
    comment_date: new Date('2023-11-30'), 
    user_id: "3",
    post_id: "5"
  },
  {
    comment_text: "Cool idea.",
    comment_date: new Date('2021-08-26'), 
    user_id: "4",
    post_id: "1"
  },
  {
    comment_text: "I will take that advice!",
    comment_date: new Date('2024-12-01'), 
    user_id: "2",
    post_id: "4"
  },
  {
    comment_text: "Crazy thought!!",
    comment_date: new Date('2022-07-07'), 
    user_id: "5",
    post_id: "2"
  },
  {
    comment_text: "I think a lot fo people would agree.",
    comment_date: new Date('2023-03-28'), 
    user_id: "1",
    post_id: "5"
  },
  {
    comment_text: "I think so too!",
    comment_date: new Date('2024-05-02'), 
    user_id: "3",
    post_id: "4"
  },
  {
    comment_text: "Really? Interesting!",
    comment_date: new Date('2021-01-15'), 
    user_id: "4",
    post_id: "1"
  }
]

const seedComment = () => Comment.bulkCreate(commentData);


module.exports = seedComment;