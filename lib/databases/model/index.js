import moment from 'moment'
import sequelize from 'sequelize'

export default class Model {
  constructor() {
    this.models = {}
  }

  createModel(instance) {
    this.models.exchangeInfo = instance.define('exchange_info', {
      price: sequelize.FLOAT,
      time: sequelize.BIGINT,
      direction: sequelize.STRING,
      amount: sequelize.BIGINT,
      digital: sequelize.STRING,
      exchange: sequelize.STRING,
      day: sequelize.BIGINT,
    })
  }
}
