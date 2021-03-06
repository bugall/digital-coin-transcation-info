import puppeteer from 'puppeteer'
import config from './config'
import moment from 'moment'
import database from './databases'
import _ from 'lodash'
import to from './util'

const db = database.getConnection()

class Controller {
  constructor() {
    this.exchangePageInfo = []
    this.browser = null
  }

  async init() {
    this.browser = await puppeteer.launch(({ args: ['--no-sandbox']}))

    // 需要监控的币的交易页面
    config.watchList.forEach((digitalName) => {
      Object.keys(config.exchanges).forEach((exchange) => {
        const exchangeInfo = config.exchanges[exchange]

        Object.keys(exchangeInfo).forEach((pair) => {
          if (pair.indexOf(digitalName) !== -1) {
            this.exchangePageInfo.push({ url: exchangeInfo[pair].url, exchange, pair, })
          }
        })
      })
    })
    await this.launchPage()
    this.start()
  }

  async launchPage() {
    for(const index in this.exchangePageInfo ) {
      const page = await this.browser.newPage()
      const url = this.exchangePageInfo[index].url 
      page.goto(url)
      this.exchangePageInfo[index].page = page
    }
  }

  async start() {
    setInterval(() => {
      const obj = this.fetchData.bind(this)
      obj().catch(err => this.retryLaunchPage())
    }, 3000)
  }

  async retryLaunchPage() {
    const now = moment.valueOf()
    if (!this.lastRetryTime) {
      this.lastRetryTime = now
    }

    if (Math.abs(this.lastRetryTime - now) > 1000 * 30) {
      this.launchPage()
      this.lastRetryTime = now
    }
  }
  async getExchangePrice(page) {
    return await page.evaluate(() => document.querySelector('#market_depth').innerText)
  }
  async getExchangeInfo(page) {
    return await page.evaluate(() => document.querySelector('#market_trades_list').innerText)
  }

  async fetchData() {
    for(const index in this.exchangePageInfo ) {
      const pageInfo = this.exchangePageInfo[index]
      const exchangeInfo = await this.getExchangeInfo(pageInfo.page)
      const exchangePrice = await this.getExchangePrice(pageInfo.page)

      const dockedExchangeInfo = this.processPageData(exchangeInfo, exchangePrice)
      
      // 保存数据到数据库
      this.saveExchangeInfo(dockedExchangeInfo, pageInfo)
    }
  }
  
  async saveExchangeInfo(exchangeDetail, pageInfo) {
    if (!_.isArray(exchangeDetail)) {
      exchangeDetail = []
    }
    const insertData = []

    
    exchangeDetail.forEach((item) => {
      insertData.push({
        time: item.time,
        price: item.price,
        direction: item.direction,
        amount: item.amount,
        digital: pageInfo.pair,
        exchange: pageInfo.exchange,
        robot: item.robot,
        day: item.day
      })
    })

    const notRepeatData = this.filterRepeatData(insertData, pageInfo.preInsertData)
    if (notRepeatData.length) {
      pageInfo.preInsertData = notRepeatData
    } else {
      pageInfo.preInsertData = insertData
    }
    
    db.model('exchange_info').bulkCreate(notRepeatData)
  }

  filterRepeatData(insert, pre) {
    const answer = []
    if (!_.isArray(insert)) {
      insert = []
    }
    if (!_.isArray(pre)) {
      pre = []
    }

    for(const index in insert) {
      if (!pre.length) break
      if (insert[index].price === pre[0].price && 
          insert[index].time === pre[0].time &&
          insert[index].amount === pre[0].amount
      ) {
        break
      } else {
        answer.push(insert[index])
      }
    }

    return answer
  }
  processPageData(result, prices) {
    if (typeof result === 'string') {
      result = result.split('\n')
    }

    if (_.isEmpty(result)) {
      result = []
    }

    let time, direction, price, amount, tmp = []
    result.forEach(element => {
      tmp.push(element)
      if (element.indexOf('方向') !== -1) {
        tmp.shift()
        tmp.pop()
        time = tmp
        tmp = []
      }

      if (element.indexOf('价格') !== -1) {
        tmp.pop()
        direction = tmp
        tmp = []
      }

      if (element.indexOf('数量') !== -1) {
        tmp.pop()
        price = tmp
        tmp = []
      }
    });

    if (tmp.length) {
      tmp.pop()
      amount = tmp
    }
    
    const answer = []
    const today = moment().format('YYYY-MM-DD')
    
    time.forEach((time, index) => {
      answer.push({
        time: moment(`${today} ${time}`).valueOf() / 1000,
        direction: direction[index] === '买入' ? 'buy' : 'sale',
        price: price[index],
        robot: prices.indexOf(price[index]) >= 0 ? 'n' : 'y',
        amount: Math.floor(amount[index]),
        day: Number(moment(today).format('YYYYMMDD'))
      })
    })
    
    return answer
  }
}

const start = new Controller();

(async function() {
  try {
    let err, data
    await start.init()
  } catch(err) {
    console.log(err)
  }
})();