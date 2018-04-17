export default exports = {
  exchanges: {
    huobi: {
      'iost-usdt': {
        url: 'https://www.huobi.pro/zh-cn/iost_usdt/exchange/'
      },
      'eos-usdt': {
        url: 'https://www.huobi.pro/zh-cn/eos_usdt/exchange/'
      },
    },
  },
  watchList: ['iost', 'eos'],
  database: {
    database: 'digital',
    port: 3306,
    username: 'root',
    password: 'MyNewPass4!',
    host: '39.104.170.37',
  }
};