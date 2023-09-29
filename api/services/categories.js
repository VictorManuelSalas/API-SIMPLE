const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class CategoriesServices {

  constructor() {
    this.categories = []
    this.generete()
  }

  generete() {
    // const { size } = req.query
    const limit = 100
    for (let index = 1; index <= limit; index++) {
      this.categories.push({
        id: index,
        name: faker.commerce.department(),
        content_items: faker.random.numeric(5),
        company_name: faker.company.name()
      })
    }
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    const index = this.categories.findIndex(index => index.id == id)
    if (index == -1) {
      throw new boom.notFound('There are not any categorie with that id...')
    } else {
      return this.categories[index]
    }
  }

  async create(body) {
    const newCategorie = {
      id: this.categories.length + 1,
      ...body
    }
    this.categories.push(newCategorie)
    return newCategorie
  }

  async update(id, changes) {
    const index = this.categories.findIndex(categorie => categorie.id == id)
    if (index == -1) {
      throw new Error('The id is invalid')
    } else {
      const categorie = this.categories[index]
      this.categories[index] = {
        ...categorie, ...changes
      }
      return {
        elementUpdate: categorie, newData: this.categories[index]
      }
    }
  }


  async delete(id) {
    const index = this.categories.findIndex(categorie => categorie.id == id)
    if (index == -1) {
      throw new boom.badRequest('The id is invalid')
    } else {
      this.categories.slice(index, 1)
      return { message: 'element deleted' }
    }
  }

}

module.exports = CategoriesServices