const faker = require('faker');

class LeaderboardsService {

  constructor(){
    this.leaderboard = [];
    this.generate();
  }

  generate(){
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      this.leaderboard.push({
        name: faker.name.firstName(),
        last: faker.name.lastName(),
        language: faker.name.jobTitle(),
      });
    }
  }

  create() {

  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.leaderboard);
      }, 2000);
    })
  }

  findOne() {

  }

  update() {

  }

  delete() {

  }
}

module.exports = LeaderboardsService;
