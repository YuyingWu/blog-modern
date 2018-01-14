import React, { PureComponent } from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
var request = require('superagent');

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      price: {"data":{"id":"cardano","name":"Cardano","symbol":"ADA","rank":"5","price_usd":"0.76917","price_btc":"0.0000566640","24h_volume_usd":"172048000.0","market_cap_usd":"19942324846.0","available_supply":"25927070538.0","total_supply":"31112483745.0","max_supply":"45000000000.0","percent_change_1h":"-3.04","percent_change_24h":"-10.66","percent_change_7d":"-24.36","last_updated":"1515943154","24h_volume_btc":"12674.607913","market_cap_btc":"1469132.0"}},
      cnyusd: 6.4499
    }
  }
  componentWillMount() {

    // debug
    return;

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
    return (
      <Layout>
        <Helmet>
          <title>Crypto计算器 | 吾悠杂货铺</title>
        </Helmet>

        <h1>Crypto计算器</h1>
      </Layout>
    );
  }
}