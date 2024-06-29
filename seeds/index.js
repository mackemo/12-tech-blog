const sequelize = require('../config/connection');

const seedUsers = require('./user');
const seedPosts = require('./post');
const seedComments = require('./comment');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- Users SEEDED -----\n');

    await seedPosts();
    console.log('\n----- Posts SEEDED -----\n');

    await seedComments();
    console.log('\n----- Comments SEEDED -----\n');

    process.exit(0);
};


seedDatabase();