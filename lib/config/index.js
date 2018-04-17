export default exports = {
  exchanges: {
    huobi: {
      'iost-usdt': {
        url: 'https://www.huobi.pro/zh-cn/iost_usdt/exchange/'
      },
      'eos-usdt': {
        url: 'https://www.huobi.pro/zh-cn/eos_usdt/exchange/'
      },
      'btc-usdt': {
        url: 'https://www.huobi.pro/zh-cn/btc_usdt/exchange/'
      },
      'xrp-usdt': {
        url: 'https://www.huobi.pro/zh-cn/xrp_usdt/exchange/'
      },
      'eth-usdt': {
        url: 'https://www.huobi.pro/zh-cn/eth_usdt/exchange/'
      },
    },
  },
  watchList: ['iost', 'eos', 'btc', 'xrp', 'eth'],
  database: {
    database: 'digital',
    port: 3306,
    username: 'root',
    password: 'MyNewPass4!',
    host: '39.104.170.37',
  }
};