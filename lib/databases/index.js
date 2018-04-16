import sequelize from 'sequelize'
import config from 'config'

class Mysql {
  constructor() {}

  createConnetion() {
    const dbConfig = config.database
    this.db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      port: dbConfig.port,
      logging: true,
      dialect: 'mysql',
      omitNull: true,
      pool: { max: 10, idle: 30},
      language: 'en',
    })
  }

  createModel() {

  }
}