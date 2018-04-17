import puppeteer from 'puppeteer'
import config from './config'

class Controller {
  constructor() {
    this.pageAddressList = []
    this.browser = null
  }

  async init() {
    this.browser = await puppeteer.launch()

    console.log(config.watchList, config.exchanges)
    // 需要监控的币的交易页面
    config.watchList.forEach((digitalName) => {
      Object.keys(config.exchanges).forEach((exchange) => {
        const exchangeInfo = config.exchanges[exchange]

        Object.keys(exchangeInfo).forEach((pair) => {
          if (pair.indexOf(digitalName) !== -1) {
            this.pageAddressList.push({ url: exchangeInfo[pair].url, exchange, pair, })
          }
        })
      })
    })

    await this.launchPage()
  }

  async launchPage() {
    for(const index in this.pageAddressList) {
      const page = await this.browser.newPage()
      const url = this.pageAddressList[index].url 
      page.goto(url)
      this.pageAddressList[index].page = page
    }

    setInterval(this.fetchData.bind(this), 2000)
  }

  async getExchangeInfo(page) {
    const data = await page.evaluate(() => document.querySelector('#market_trades_list').innerText);
    return data
  }

  async fetchData() {
    for(const index in this.pageAddressList) {
      const exchangeInfo = await this.getExchangeInfo(this.pageAddressList[index].page)
      const dockedExchangeInfo = this.processPageData(exchangeInfo)
    }
  }
  
  async saveExchangeInfo() {

  }

  processPageData(result) {
    if (typeof result === 'string') {
      result = result.split('\n')
    }
    let time, direction, price, amount = []
    result.forEach(element => {
      tmp.push(element)
      if (element.indexOf('方向') !== -1) {
        tmp.shift()
        time = tmp
        tmp = []
      }

      if (element.indexOf('价格') !== -1) {
        tmp.shift()
        direction = tmp
        tmp = []
      }

      if (element.indexOf('数量') !== -1) {
        tmp.shift()
        price = tmp
        tmp = []
      }
    });

    if (tmp.length) {
      tmp.shift()
      amount = tmp
    }
    return { time, direction, price, amount }
  }
}

const start = new Controller();

(async function() {
  try {
    start.init()
  } catch(err) {
    console.log(err)
  }
})();