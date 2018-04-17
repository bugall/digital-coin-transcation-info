import moment from 'moment'
export default class Model {
  constructor(instance) {
    this.instance = instance
    this.models = {}
  }

  getModel(name) {
    
  }

  createModel() {
    this.models.exchangeInfo = this.instance.define('exchange_info', {
      price: this.instance.Number,
      time: this.instance.Number,
      direction: this.instance.Boolean,
      amount: this.instance.Number
    })
  }
}
