const faker = require('faker');

class LanguagesService {

  constructor(){
    this.languages = [];
    this.languagesLeader = [];
    this.generate();
  }

  async generate(){
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      this.languages.push({
        langid: faker.datatype.uuid(),
        language: faker.name.jobTitle(),
        name: faker.name.firstName(),
        last: faker.name.lastName(),
      });

    }

    for (let index = 0; index < limit; index++) {
      this.languagesLeader.push({
        name: faker.name.firstName(),
        last: faker.name.lastName(),
      });
    }
  }

  create() {

  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.languages);
      }, 2000);
    })
  }

  async findOne(langid) {
    return this.languages.find(item => item.langid === langid);
  }

  async findLeader() {
    return this.languagesLeader;
  }

  update() {

  }

  async delete() {

  }
}

module.exports = LanguagesService;
