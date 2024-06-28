const { User } = require('../models');

const userData = [
  {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  },
  {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  },
  {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  },
  {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  },
  {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  },
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;