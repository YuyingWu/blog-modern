import React, { PureComponent } from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
var request = require('superagent');

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      price: {"data":{"id":"cardano","name":"Cardano","symbol":"ADA","rank":"5","price_usd":"0.76917","price_btc":"0.0000566640","24h_volume_usd":"172048000.0","market_cap_usd":"19942324846.0","available_supply":"25927070538.0","total_supply":"31112483745.0","max_supply":"45000000000.0","percent_change_1h":"-3.04","percent_change_24h":"-10.66","percent_change_7d":"-24.36","last_updated":"1515943154","24h_volume_btc":"12674.607913","market_cap_btc":"1469132.0"}},
      cnyusd: 6.4499,
      btcusd: 13781.4,
      entryData: {
        totalCNY: 1000, // CNY
        count: 100 // 持有数量
      },
      exitPoints: {
        cashoutTimes: 5,
        cashoutStepPercentage: [200, 50, 50, 50, 50], // % percent
      }
    }
  }
  componentWillMount() {
    // debugging
    return;

    // 获取 美元-BTC 汇率
    request
    .get('http://localhost:18080/crypto/price')
    .query({ symbol: 'bitcoin' }) // query string
    // .use(prefix) // Prefixes *only* this request
    // .use(nocache) // Prevents caching of *only* this request
    .end((err, res) => {
      if(err){
        return console.error(err);
      }

      const { body } = res;
      const { data: { price_usd } } = body;

      this.setState({
        btcusd: price_usd
      });
    });

    // 获取价格
    request
    .get('http://localhost:18080/crypto/price')
    // .query({ action: 'edit', city: 'London' }) // query string
    // .use(prefix) // Prefixes *only* this request
    // .use(nocache) // Prevents caching of *only* this request
    .end((err, res) => {
      if(err){
        return console.error(err);
      }

      const { body } = res;
      const { data } = body;

      this.setState({
        price: data
      });
    });

    // 获取cny-usd汇率
    request
    .get('http://localhost:18080/crypto/cnyusd')
    // .query({ action: 'edit', city: 'London' }) // query string
    // .use(prefix) // Prefixes *only* this request
    // .use(nocache) // Prevents caching of *only* this request
    .end((err, res) => {
      if(err){
        return console.error(err);
      }

      const { body } = res;

      this.setState({
        cnyusd: body.rate
      });
    });
  }
  render() {
    const { 
      price: { data } = {},
      cnyusd,
      btcusd,
      entryData: { totalCNY, count },
      exitPoints: { cashoutTimes, cashoutStepPercentage }
    } = this.state;
    const { name, symbol, price_usd, price_btc } = data;

    // 每份卖出rmb总值
    const cnyPerStep = totalCNY / cashoutTimes;
    const usdPerStep = cnyPerStep / cnyusd;
    const btcPerStep = usdPerStep / btcusd;

    // 计算变量
    // 最新BTC市值
    let btcLatestTotal = totalCNY / cnyusd / btcusd;
    // 最新BTC价值/token
    let btcLatestPrice = price_btc;
    // 最新持币数量
    let hodlCount = count;

    return (
      <Layout>
        <Helmet>
          <title>Crypto计算器 | 吾悠杂货铺</title>
        </Helmet>

        <h1>Crypto计算器</h1>
        <h2>{name}({symbol})</h2>

        <h3>Market Price:</h3>
        <p>
          {price_usd} $<br/>
          {price_usd * cnyusd} ￥<br/>
          {price_btc} BTC
        </p>

        <h3>本金:</h3>
        <p>
          {totalCNY} ￥<br/>
          {totalCNY / cnyusd} $<br/>
          {btcLatestTotal} BTC
        </p>

        <h3>卖点因子：</h3>
        <p>
          卖出次数: { cashoutTimes } <br/>
          每份价值： {btcPerStep} BTC | {cnyPerStep} ￥ | {usdPerStep} $ <br/>
          卖出阶梯: { cashoutStepPercentage.join(' -> ') } %
        </p>

        <h3>卖点列表：</h3>
        <ul>
        { cashoutStepPercentage.map((step, index) => {
          const originCount = hodlCount;
          const lastPrice = btcLatestPrice;
          const originTotal = btcLatestTotal;

          btcLatestPrice = btcLatestPrice * (100 + step) / 100;
          
          // btcLatestTotal -= btcPerStep;

          const sellCount = btcPerStep / btcLatestPrice;

          hodlCount -= sellCount;

          btcLatestTotal = btcLatestPrice * hodlCount - btcPerStep;

          return (
            <li key={`exit-point-${index}`}>
              本轮涨幅：{step} %<br/>
              原本价格：{lastPrice} BTC<br/>
              <span className="bg-danger">最新价格：{btcLatestPrice} BTC</span><br/>
              原本持币：{originCount}<br/>
              <span className="bg-danger">卖出持币：{sellCount}</span><br/>
              目前持币：{hodlCount}<br/>
              上轮本金：{originTotal} BTC<br/>
              回收本金：{btcPerStep} BTC = {btcLatestPrice} BTC * {sellCount}<br/>
              剩余总额：{btcLatestTotal} BTC
            </li>
          );
        })}
        </ul>

        <h3>最后的最后：</h3>
        <p>
          原本价值：{cnyPerStep * cashoutTimes} ￥ | {usdPerStep * cashoutTimes} $ | {btcPerStep * cashoutTimes} BTC<br/>
          原本持币：{ count }<br/>
          <span className="bg-success">现在价值：{ btcLatestTotal * btcusd * cnyusd } ￥ | { btcLatestTotal * btcusd } $ | { btcLatestTotal }BTC</span><br/>
          <span className="bg-success">现在持币：{ hodlCount }</span>
        </p>
      </Layout>
    );
  }
}