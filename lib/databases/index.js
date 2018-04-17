import sequelize from 'sequelize'
import Model from './model'
import config from '../config'

class Mysql extends Model{
  constructor() {
    super()
    this.db = null
    this.createConnetion()
  }

  createConnetion() {
    const dbConfig = config.database
    this.db = new sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      port: dbConfig.port,
      logging: true,
      dialect: 'mysql',
      omitNull: true,
      pool: { max: 10, idle: 30},
      language: 'en',
      define: {
        timestamps: false,
      }
    })
    this.createModel(this.db)
  }

  getConnection() {
    return this.db
  }
}

const db = new Mysql()
export default exports = db