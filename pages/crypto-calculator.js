import React, { PureComponent } from 'react';
import Layout from '../components/layout';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';
var request = require('superagent');

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      token: 'cardano',
      price: {}/*{"id":"cardano","name":"Cardano","symbol":"ADA","rank":"5","price_usd":"0.76917","price_btc":"0.0000566640","24h_volume_usd":"172048000.0","market_cap_usd":"19942324846.0","available_supply":"25927070538.0","total_supply":"31112483745.0","max_supply":"45000000000.0","percent_change_1h":"-3.04","percent_change_24h":"-10.66","percent_change_7d":"-24.36","last_updated":"1515943154","24h_volume_btc":"12674.607913","market_cap_btc":"1469132.0"}*/,
      cnyusd: 0, // 6.4499
      btcusd: 0, // 13781.4
      entryData: {
        totalCNY: 1000, // CNY
        count: 100 // 持有数量
      },
      exitPoints: {
        cashoutTimes: 5,
        cashoutStepPercentage: [200, 50, 50, 50, 50], // % percent
      },
      vert: {
        btc: 1,
        usd: 0,
        cny: 0
      },
      // UI
      errMsgShow: false,
      btnVertEnable: false
    }

    this.calculate = this.calculate.bind(this);
    this.vert = this.vert.bind(this);
  }

  componentWillMount() {
    this.basicData();
  }

  basicData() {
    // 获取 美元-BTC 汇率
    request
    .get('http://wuyuying.com/crypto/price')
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

    // 获取cny-usd汇率
    request
    .get('http://wuyuying.com/crypto/cnyusd')
    // .query({ action: 'edit', city: 'London' }) // query string
    // .use(prefix) // Prefixes *only* this request
    // .use(nocache) // Prevents caching of *only* this request
    .end((err, res) => {
      if(err){
        return console.error(err);
      }

      const { body } = res;

      this.setState({
        cnyusd: body.rate,
        btnVertEnable: true
      });
    });
  }

  fetchData() {
    const { token } = this.state;

    // 获取价格
    request
    .get('http://wuyuying.com/crypto/price')
    .query({ symbol: token }) // query string
    // .use(prefix) // Prefixes *only* this request
    // .use(nocache) // Prevents caching of *only* this request
    .end((err, res) => {
      if(err){
        return console.error(err);
      }

      const { body } = res;
      const { data } = body;

      if(!data){
        this.setState({
          errMsgShow: true
        }, () => {
          setTimeout(()=>{
            this.setState({
              errMsgShow: false
            })
          }, 5000);
        })
      }else{
        this.setState({
          price: data
        });
      }
    });
  }

  vert(currency) {
    const {
      vertBTC: { value: btc },
      vertUSD: { value: usd },
      vertCNY: { value: cny }
    } = this;
    const { btcusd, cnyusd } = this.state;
    let vert = {
      btc: 0,
      usd: 0,
      cny: 0
    }
    const btcNum = +btc;
    const usdNum = +usd;
    const cnyNum = +cny;

    switch(currency){
      case 'btc':
        vert = {
          btc: btcNum,
          usd: btcNum * btcusd,
          cny: btcNum * btcusd * cnyusd
        };
        break;
      case 'usd':
        vert = {
          btc: usdNum / btcusd,
          usd: usdNum,
          cny: usdNum / cnyusd
        };
        break;
      case 'cny':
        vert = {
          btc: cnyNum / cnyusd / btcusd,
          usd: cnyNum / cnyusd,
          cny: cnyNum
        };
        break;
    }

    this.setState({
      vert
    });

    // 修改 state 无效，直接修改dom value
    this.vertBTC.value = vert.btc;
    this.vertUSD.value = vert.usd;
    this.vertCNY.value = vert.cny;
  }

  calculate() {
    const {
      token: { value: tokenValue },
      totalCNY: { value: totalValue },
      hodlCount: { value: hodlValue },
      cashoutTimes: { value: cashoutTimesValue },
      cashoutStepPercentageStr: { value: cashoutStepPercentageStrValue }
    } = this;

    this.setState({
      token: tokenValue,
      entryData: {
        totalCNY: totalValue,
        count: hodlValue
      },
      exitPoints: {
        cashoutTimes: cashoutTimesValue,
        cashoutStepPercentage: cashoutStepPercentageStrValue.split(',')
      }
    }, () => {
      this.fetchData();
    });
  }

  render() {
    const { 
      price,
      cnyusd,
      btcusd,
      entryData: { totalCNY, count },
      exitPoints: { cashoutTimes, cashoutStepPercentage },
      errMsgShow,
      vert : { btc, usd, cny },
      btnVertEnable
    } = this.state;

    const { name, symbol, price_usd, price_btc } = price;

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
      <div className="container">
        <style jsx>{`
          .gutter{
            margin: 1rem;
          }
          .gutterPadding{
            padding: 1rem;
          }
        `}</style>

        <Helmet>
          <title>Crypto计算器 | 吾悠杂货铺</title>
        </Helmet>

        <h1>Hello, Crypto</h1>

        <a href="https://github.com/YuyingWu/blog-modern/blob/master/pages/crypto-calculator.js">
          <img style={{
            position: 'absolute',
            top: 0,
            right: 0,
            border: 0
          }} src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" />
        </a>

        <section className="bg-info gutterPadding">
          <h2>法币-Crypto 汇率</h2>

          <p>1 BTC = {btcusd} USD</p>
          <p>1 USD = {cnyusd} CNY</p>

          <form>
            <div className="form-group">
              <label>BTC: </label>
              <input
                type="number"
                className="form-control"
                defaultValue={this.state.vert.btc}
                ref={i => (this.vertBTC = i)}
                onKeyUp={this.vert.bind(this, 'btc')}
              />
            </div>
            <div className="form-group">
              <label>USD: </label>
              <input type="number" className="form-control" defaultValue={this.state.vert.usd} ref={i => (this.vertUSD = i)} onKeyUp={this.vert.bind(this, 'usd')}/>
            </div>
            <div className="form-group">
              <label>CNY: </label>
              <input type="number" className="form-control" defaultValue={this.state.vert.cny} ref={i => (this.vertCNY = i)} onKeyUp={this.vert.bind(this, 'cny')}/>
            </div>
          </form>
        </section>

        <section className="bg-success gutterPadding">
          <h2>Crypto卖出计算器</h2>
          <div className="text-danger text-center gutter">
            这里需要输入货币全称，如cardano，去<a href="https://coinmarketcap.com/" target="_blank">coinmarketcap</a>搜一下币名吧~
          </div>

          <form className="form-inline">
            <div className="form-group">
              <label>Coin Name: </label>
              <input type="text" className="form-control" placeholder="Token" defaultValue={this.state.token} ref={i => (this.token = i)}/>
            </div>

            <div>
              <div className="form-group">
                <label>Total(CNY): </label>
                <input type="number" className="form-control" placeholder="1000" defaultValue={this.state.entryData.totalCNY} ref={i => (this.totalCNY = i)}/>
              </div>

              <div className="form-group">
                <label>Hodl Count: </label>
                <input type="number" className="form-control" placeholder="1000" defaultValue={this.state.entryData.count} ref={i => (this.hodlCount = i)}/>
              </div>
            </div>

            <div>
              <div className="form-group">
                <label>Cashout Times: </label>
                <input type="number" className="form-control" placeholder="5" defaultValue={this.state.exitPoints.cashoutTimes} ref={i => (this.cashoutTimes = i)}/>
              </div>

              <div className="form-group">
                <label>Cashout Step(%):</label>
                <input type="text" className="form-control" placeholder="250,50,50,50,50" defaultValue={this.state.exitPoints.cashoutStepPercentage.join(',')} ref={i => (this.cashoutStepPercentageStr = i)}/>
              </div>
            </div>

            <div className="form-group">
              <div className="btn btn-primary" role="button" onClick={this.calculate}>计算</div>
            </div>
          </form>

          { (price && price.id) ? (
          <div>
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
                <span className="bg-primary">第{ index + 1 }轮 </span> 本轮涨幅：{step} %<br/>
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
          </div>
          )
          : errMsgShow && (
            <div className="bg-danger text-center gutter">
              token（币的全称）输入错误了，去<a href="https://coinmarketcap.com/" target="_blank">coinmarketcap</a>搜一下币名吧~
            </div>
          )}
        </section>

        <Footer />
      </div>
    );
  }
}