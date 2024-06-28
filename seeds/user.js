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

async function seedUser() {
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,    
    })
}


module.exports = seedUser;