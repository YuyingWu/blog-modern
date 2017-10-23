import React from 'react';
import Layout from '../components/layout';
import { Helmet } from "react-helmet";

export default class extends React.Component {
  constructor() {
    super();
    
    this.state = {
      orderConfig: {
        total: 10000,
        list: [
          {
            percentage: 10,
            price: 5,
            stock: 0
          }
        ]
      },
      combineConfig: {
        total: 10000,
        list: [
          {
            percentage: 20,
            marketShare: 0
          }
        ]
      }
    }
  }
  setStateByKey(data, event) {
    const { key, index, domain } = data;
    const { total, list } = this.state[domain];
    let newList = [...list];
    const matchItem = newList[index];
    
    matchItem[key] = event.target.value;
    
    switch(domain){
      case 'orderConfig':
        matchItem['stock'] = total * (matchItem['percentage']/100) / matchItem['price'];
    
        this.setState({
          orderConfig: {
            total: total,
            list: newList
          } 
        });
        
        break;
      case 'combineConfig':
        if(!total){
          return;
        }
        
        matchItem['percentage'] = matchItem['marketShare'] / total * 100;
        
        this.setState({
          combineConfig: {
            total,
            list: newList
          } 
        });
        
        break;
    }
  }
  addRow(data, event) {
    event.preventDefault();
    
    const { domain } = data;
    
    switch(domain){
      case 'orderConfig':
        this.setState({
          orderConfig: {
            total: this.state[domain].total,
            list: [...this.state[domain].list, {
              percentage: 50,
              price: 2,
              stock: 0
            }]
          }
        });
        break;
      case 'combineConfig':
        this.setState({
          combineConfig: {
            total: this.state[domain].total,
            list: [...this.state[domain].list, {
               percentage: 50,
               marketShare: 2
            }]
          }
        });
        break;
    }
  }
  calculate(data, event) {
    const { domain } = data;
    const total = event.target.value;
    const { list } = this.state[domain];
    let newList = [];
    
    switch(data.domain){
      case 'orderConfig':
        this.setState({
          orderConfig: {
            total,
            list
          }
        }, () => {
          list.map(item => {
            if(!item.price || !item.percentage){
              return;
            }

            item.stock = total * (item.percentage / 100) / item.price;

            newList.push(item);
            
            this.setState({
              orderConfig: {
                total,
                list: newList
              }
            });
          });
        })
        break;
      case 'combineConfig':
        this.setState({
          combineConfig: {
            total,
            list
          }
        }, () => {
          list.map(item => {
            if(!total || !item.marketShare){
              return;
            }

            item.percentage = item.marketShare / total * 100;

            newList.push(item);
          });
          
          this.setState({
            combineConfig: {
              total,
              list: newList
            }
          });
        })
        
        break;
    }
  }
  render() {
    return (
    <Layout>
      <style jsx>{`
        .row-custom{
          margin: 1rem 0;
        }
        .gutter{
          margin: 0 0.5rem;
        }
      `}</style>
      
      <Helmet>
        <title>滚雪球 | 吾悠杂货铺</title>
      </Helmet>
      
      <h1>滚雪球</h1>
      
      <section>
        <h2>
          调仓下单计算器
          <a className="btn btn-default gutter" href="#" role="button" onClick={this.addRow.bind(this, {
            domain: 'orderConfig'
          })}>添加</a>
        </h2>
        
        <form className="form-inline">
          <div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Total" defaultValue={this.state.orderConfig.total} 
                onBlur={this.calculate.bind(this, {
                  domain: 'orderConfig'
                })}/>
              <label className="gutter">Total</label>
            </div>
          </div>
          { this.state.orderConfig.list.map( (item, index) => (
          <div key={`order-${item.name}-${index}`} className="row-custom">
            <div className="form-group">
              <input type="number" className="form-control" placeholder="Percentage" defaultValue={item.percentage}
                onKeyUp={this.setStateByKey.bind(this, {
                  key: 'percentage',
                  domain: 'orderConfig',
                  index
                })}/>
              <span className="gutter">%</span><span className="gutter">*</span> 
            </div>
            <div className="form-group">
              <span className="gutter">￥</span>
              <input type="number" className="form-control" placeholder="Price" defaultValue={item.price}
                onKeyUp={this.setStateByKey.bind(this, {
                  key: 'price',
                  domain: 'orderConfig',
                  index
                })}/>
            </div>
            <div className="form-group">
              <span className="gutter">=</span>
              <input type="number" className="form-control" placeholder="Stock" readOnly value={item.stock}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="form-group bg-success gutter">
              { index + 1}
            </div>
          </div>
          ))}
        </form>
      </section>
      
      <section>
        <h2>
          组合调仓计算器
          <a className="btn btn-default gutter" href="#" role="button" onClick={this.addRow.bind(this, {
            domain: 'combineConfig'
          })}>添加</a>
        </h2>
        <form className="form-inline">
          <div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Total" defaultValue={this.state.combineConfig.total}
                onBlur={this.calculate.bind(this, {
                  domain: 'combineConfig'
                })} />
              <label className="gutter">Total</label>
            </div>
          </div>
          { this.state.combineConfig.list.map( (item, index) => (
          <div key={`combine-${item.name}-${index}`} className="row-custom">
            <div className="form-group">
              <input type="number" className="form-control" placeholder="Market Share" defaultValue={item.marketShare}
                onKeyUp={this.setStateByKey.bind(this, {
                  key: 'marketShare',
                  domain: 'combineConfig',
                  index
                })}/>
              <span className="gutter">￥</span>
            </div>
            <div className="form-group">
              <span className="gutter">=</span>
              <input type="number" className="form-control" placeholder="Percentage" readOnly value={item.percentage}/>
              <span className="gutter">%</span>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="form-group bg-success gutter">
              { index + 1}
            </div>
          </div>
          ))}
        </form>
      </section>
    </Layout>
    );
  }
}