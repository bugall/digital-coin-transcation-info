import puppeteer from 'puppeteer'
import config from './config'

class Controller {
  async constructor() {
    this.pageAddressList = []
    this.browser = await puppeteer.launch();
  }

  async digitalController() {
    config.watchList.forEach((digitalName) => {
      Object.keys(config.exchanges).forEach((exchange) => {
        Object.keys(exchange).forEach((pair) => {
          if (pair.indexOf(digitalName) !== -1) {
            this.pageAddressList.push({ url: digitalPair.url, exchange, pair, })
          }
        })
      })
    })
    
    const browser = await puppeteer.launch();
  }

  async launchPage() {
    for(const index in this.pageAddressList) {
      const page = await this.browser.newPage()
      page.goto(this.pageAddressList[index].url)
      this.pageAddressList[index].page = page
    }

    setInterval(this.fetchData, 2000)
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
    });

    if (tmp.length) {
      tmp.shift()
      price = tmp
    }
    return { time, direction, price }
  }
}