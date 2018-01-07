import React, { PureComponent } from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import { RadioGroup, Radio } from 'react-radio-group';

export default class extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      selectedValue: 'row'
    }

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    const playground = this.refs.playground;

    this.setState({selectedValue: value});

    playground.style.setProperty('--flex-direction', value)

    // console.log(getComputedStyle(playground).getPropertyValue('--flex-direction'));
  }
  render() {
    return (
    <Layout>
      <style jsx>{`
        .playground {
          width: 980px;
          display: flex;
          background: rgba(156,39,176,0.2);
          flex-direction: var(--flex-direction, row);
        }
        .item{
          background: rgba(255,152,0,0.2);
          width: 50px;
          height: 50px;
          line-height: 50px;
          border: 1px solid #fff;
          text-align: center;
        }
        .form-row{
          display: block;
        }
      `}</style>
      
      <Helmet>
        <title>Flexbox | 吾悠杂货铺</title>
      </Helmet>
      
      <h1>Flexbox Demo</h1>

      <div>
        <h2>Parent Flex Properties – flex container</h2>

        <form>
          <h3>flex-direction</h3>
          <RadioGroup name="row" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
            <label className="form-row"><Radio value="row" />row</label>
            <label className="form-row"><Radio value="row-reverse" />row-reverse</label>
            <label className="form-row"><Radio value="column" />column</label>
            <label className="form-row"><Radio value="column-reverse" />column-reverse</label>
          </RadioGroup>
        </form>
      </div>

      <section className="playground" ref="playground">
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item">4</div>
      </section>
    </Layout>
    );
  }
}