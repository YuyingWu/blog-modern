import React, { PureComponent } from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import { RadioGroup, Radio } from 'react-radio-group';

export default class extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'flex-start'
    }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value, prop) {
    const playground = this.refs.playground;

    switch(prop){
      case 'direction':
        this.setState({flexDirection: value});
        playground.style.setProperty('--flex-direction', value);
        break;
      case 'wrap':
        this.setState({flexWrap: value});
        playground.style.setProperty('--flex-wrap', value);
        break;
      case 'justify-content':
        this.setState({justifyContent: value});
        playground.style.setProperty('--justify-content', value);
        break;
      case 'align-items':
        this.setState({alignItems: value});
        playground.style.setProperty('--align-items', value);
        break;
      case 'align-content':
        this.setState({alignContent: value});
        playground.style.setProperty('--align-content', value);
        break;
    }
  }
  componentDidMount() {
    // 初始化

    const { playground } = this.refs;
    const { flexDirection, flexWrap, justifyContent, alignItems, alignContent } = this.state;
    
    playground.style.setProperty('--flex-direction', flexDirection);
    playground.style.setProperty('--flex-wrap', flexWrap);
    playground.style.setProperty('--justify-content', justifyContent);
    playground.style.setProperty('--align-items', alignItems);
    playground.style.setProperty('--align-content', alignContent);
  }

  render() {
    const { flexDirection, flexWrap, justifyContent, alignItems, alignContent } = this.state;

    return (
    <Layout>
      <style jsx>{`
        /* flex element styles */
        .playground {
          display: flex;
          background: rgba(156,39,176,0.2);
          height: 300px;
          flex-direction: var(--flex-direction);
          flex-wrap: var(--flex-wrap);
          justify-content: var(--justify-content);
          align-items: var(--align-items);
          align-content: var(--align-content);
        }
        .item{
          background: rgba(255,152,0,0.2);
          border: 1px solid #fff;
          flex: 0 0 200px;
        }

        /* other decoration */
        .item{
          text-align: center;
          padding: 5px;
        }
        .form-row{
          display: block;
        }
        .widget{
          width: 200px;
          margin-right: 20px;
        }
        img{
          display: block;
          margin: 0 auto;
        }
      `}</style>
      
      <Helmet>
        <title>Flexbox | 吾悠杂货铺</title>
      </Helmet>
      
      <h1>Flexbox Demo</h1>

      <div>
        <h2>Parent Flex Properties – flex container</h2>

        <form className="clearfix">
          <div className="widget pull-left">
            <h3>flex-direction</h3>
            <RadioGroup selectedValue={this.state.flexDirection} onChange={e => this.handleChange(e, 'direction')}>
              <label className="form-row"><Radio value="row" />row</label>
              <label className="form-row"><Radio value="row-reverse" />row-reverse</label>
              <label className="form-row"><Radio value="column" />column</label>
              <label className="form-row"><Radio value="column-reverse" />column-reverse</label>
            </RadioGroup>
          </div>

          <div className="widget pull-left">
            <h3>flex-wrap</h3>
            <RadioGroup selectedValue={this.state.flexWrap} onChange={e => this.handleChange(e, 'wrap')}>
              <label className="form-row"><Radio value="nowrap" />nowrap</label>
              <label className="form-row"><Radio value="wrap" />wrap</label>
              <label className="form-row"><Radio value="wrap-reverse" />wrap-reverse</label>
            </RadioGroup>
          </div>

          <div className="widget pull-left">
            <h3>justify-content</h3>
            <RadioGroup selectedValue={this.state.justifyContent} onChange={e => this.handleChange(e, 'justify-content')}>
              <label className="form-row"><Radio value="flex-start" />flex-start</label>
              <label className="form-row"><Radio value="flex-end" />flex-end</label>
              <label className="form-row"><Radio value="center" />center</label>
              <label className="form-row"><Radio value="space-between" />space-between</label>
              <label className="form-row"><Radio value="space-around" />space-around</label>
            </RadioGroup>
          </div>

          <div className="widget pull-left">
            <h3>align-items</h3>
            <RadioGroup selectedValue={this.state.alignItems} onChange={e => this.handleChange(e, 'align-items')}>
              <label className="form-row"><Radio value="stretch" />stretch</label>
              <label className="form-row"><Radio value="flex-start" />flex-start</label>
              <label className="form-row"><Radio value="flex-end" />flex-end</label>
              <label className="form-row"><Radio value="center" />center</label>
              <label className="form-row"><Radio value="baseline" />baseline</label>
            </RadioGroup>
          </div>

          <div className="widget pull-left">
            <h3>align-content</h3>
            <RadioGroup selectedValue={this.state.alignContent} onChange={e => this.handleChange(e, 'align-content')}>
              <label className="form-row"><Radio value="stretch" />stretch</label>
              <label className="form-row"><Radio value="flex-start" />flex-start</label>
              <label className="form-row"><Radio value="flex-end" />flex-end</label>
              <label className="form-row"><Radio value="center" />center</label>
              <label className="form-row"><Radio value="space-between" />space-between</label>
              <label className="form-row"><Radio value="space-around" />space-around</label>
            </RadioGroup>
          </div>
        </form>
      </div>

      <section className="playground" ref="playground">
        <div className="item">
          <img src="https://files.coinmarketcap.com/static/img/coins/32x32/bitcoin.png" />
          Bitcoin
        </div>
        <div className="item">
          <img src="https://files.coinmarketcap.com/static/img/coins/32x32/cardano.png" />
          Cardano<br/>Cardano<br/>Cardano<br/>Cardano<br/>
        </div>
        <div className="item">
          <img src="https://files.coinmarketcap.com/static/img/coins/32x32/tron.png" />
          Tron<br/>Tron
        </div>
        <div className="item">
          <img src="https://files.coinmarketcap.com/static/img/coins/32x32/ethlend.png" />
          EthLend
        </div>
      </section>
    </Layout>
    );
  }
}