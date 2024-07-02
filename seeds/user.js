const { User } = require('../models');

const userData = [
  {
    username: "starfish01",
    first_name: "Johnny",
    last_name: "Johnson",
    email: "jjohnson01@gmail.com",
    password: "StarFish01!"
  },
  {
    username: "snowMan43",
    first_name: "Albert",
    last_name: "Andrews",
    email: "aandrews43@gmail.com",
    password: "Noman777!"
  },
  {
    username: "SillyMongoose2",
    first_name: "Perry",
    last_name: "Patrickson",
    email: "ppatrickson2@gmail.com",
    password: "mongoon2?!"
  },
  {
    username: "venturer800",
    first_name: "Laurie",
    last_name: "Larson",
    email: "llarson800@gmail.com",
    password: "appleVen?9"
  },
  {
    username: "lemonTree3",
    first_name: "Carol",
    last_name: "Cowper",
    email: "ccowper3@gmail.com",
    password: "Forest76trees?"
  },
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;