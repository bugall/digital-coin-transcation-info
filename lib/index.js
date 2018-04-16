import puppeteer from 'puppeteer'

let page = null

try {
  (async () => {
    const browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://www.huobi.pro/zh-cn/iost_usdt/exchange/');
    setInterval(async () => {
      await ()
    }, 1000)
  })();
} catch(err) {
  console.log(err.stack)
}

const fetchTransactionInfo = async () => {
  const result = await page.evaluate(() => document.querySelector('#market_trades_list').innerText);
  const time, direction, price = []
  let tmp = []

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