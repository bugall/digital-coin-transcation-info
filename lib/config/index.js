export default exports = {
  exchanges: {
    huobi: {
      'iost-usdt': {
        url: 'https://www.huobi.pro/zh-cn/iost_usdt/exchange/'
      },
      'eos-usdt': {
        url: 'https://www.huobi.pro/zh-cn/eos_usdt/exchange/'
      },
      'xrp-usdt': {
        url: 'https://www.huobi.pro/zh-cn/xrp_usdt/exchange/'
      },
      'itc-usdt': {
        url: 'https://www.huobi.pro/zh-cn/itc_usdt/exchange/'
      },
      'smt-usdt': {
        url: 'https://www.huobi.pro/zh-cn/smt_usdt/exchange/'
      },
      'ruff-usdt': {
        url: 'https://www.huobi.pro/zh-cn/ruff_usdt/exchange/'
      },
      'ht-usdt': {
        url: 'https://www.huobi.pro/zh-cn/ht_usdt/exchange/'
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