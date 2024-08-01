const { Post } = require('../models');

const postData = [
  {
    post_title: "Artificial Intelligence",
    post_text: "You cannot trust that AI will spit out the correct information",
    post_date: "March 22, 2023",
    user_id: 3,
  },
  {
    post_title: "Bootstrap",
    post_text: "Bootstrap is a handy tool for a CSS framework when using grids on your page",
    post_date: "July 14, 2022",
    user_id: 2,
  },
  {
    post_title: "Agile Methodology",
    post_text: "It is a good idea to plan out your code before coding, code everything out, then go back, revise, get feedback, improve, and do the cycle over",
    post_date: "December 2, 2023",
    user_id: 5,
  },
  {
    post_title: "Unit testing",
    post_text: "Small tests to check if the code is working is a good debugging strategy to prevent mishaps and crashes",
    post_date: "Febraury 10, 2024",
    user_id: 1,
  },
  {
    post_title: "Colloboration Workflow",
    post_text: "Having multiple peers review your code can allow multiple insights to choose from to optimize the best style and process for your own work",
    post_date: "April 15, 2021",
    user_id: 4,
  },
]

const seedPost = () => Post.bulkCreate(postData);


module.exports = seedPost;