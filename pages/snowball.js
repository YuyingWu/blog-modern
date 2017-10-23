import React from 'react';
import Layout from '../components/layout';

export default class extends React.Component {
  constructor() {
    super();
    
    this.state = {
      orderConfig: {
        total: 100,
        list: [
          {
            percentage: 50,
            price: 2,
            name: '',
            stock: 0
          }
        ]
      },
      combineConfig: {
        total: 100,
        list: [
          {
            percentage: 50,
            marketShare: 2,
            name: ''
          }
        ]
      }
    }
    
    // this.setStateByKey.bind(this);
  }
  setStateByKey(data, event) {
    const { key, index, domain } = data;
    const { total, list } = this.state[domain];
    let newList = [...list];
    let newTotal = total;
    const matchItem = newList[index];
    
    if(data.key == 'total'){
      newTotal = event.target.value;
    }else{
      matchItem[key] = event.target.value;
    }
    
    switch(domain){
      case 'orderConfig':
        matchItem['stock'] = newTotal * (matchItem['percentage']/100) / matchItem['price'];
    
        this.setState({
          orderConfig: {
            total: newTotal,
            list: newList
          } 
        });
        break;
      case 'combineConfig':
        matchItem['percentage'] = matchItem['marketShare'] / newTotal * 100;
    
        this.setState({
          combineConfig: {
            total: newTotal,
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
              name: "",
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
               marketShare: 2,
               name: ''
            }]
          }
        });
        break;
    }
  }
  render() {
    return (
    <Layout>
      <style jsx>{`
        .row-custom{
          margin: 10px 0;
        }
      `}</style>
      
      <h1>滚雪球</h1>
      
      <section>
        <h2>
          调仓下单计算器
          <a className="btn btn-default" href="#" role="button" onClick={this.addRow.bind(this, {
            domain: 'orderConfig'
          })}>添加</a>
        </h2>
        
        
        <form className="form-inline">
          <div>
            <div className="form-group">
              <label>Total：</label>
              <input type="text" className="form-control" placeholder="Total" defaultValue={this.state.orderConfig.total}
                onBlur={this.setStateByKey.bind(this, {
                  key: 'total',
                  domain: 'orderConfig',
                  root: true
                })} />
            </div>
          </div>
          { this.state.orderConfig.list.map( (item, index) => (
          <div key={`order-${item.name}-${index}`} className="row-custom">
            <div className="form-group bg-success">
              { index + 1}
            </div>

            <div className="form-group">
              <input type="number" className="form-control" placeholder="Percentage" defaultValue={item.percentage}
                onKeyUp={this.setStateByKey.bind(this, {
                  key: 'percentage',
                  domain: 'orderConfig',
                  index
                })}/>
              % * 
            </div>
            <div className="form-group">
              ￥
              <input type="number" className="form-control" placeholder="Price" defaultValue={item.price}
                onKeyUp={this.setStateByKey.bind(this, {
                  key: 'price',
                  domain: 'orderConfig',
                  index
                })}/>
            </div>
            <div className="form-group">
               = 
              <input type="number" className="form-control" placeholder="Stock" readOnly value={item.stock}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" defaultValue={item.name}
                onBlur={this.setStateByKey.bind(this, {
                  key: 'name',
                  domain: 'orderConfig',
                  index
                })} />
            </div>
          </div>
          ))}
        </form>
      </section>
      
      <section>
        <h2>组合调仓计算器</h2>
        <form className="form-inline">
          <div>
            <div className="form-group">
              <label>Total：</label>
              <input type="text" className="form-control" placeholder="Total" defaultValue={this.state.combineConfig.total}
                onBlur={this.setStateByKey.bind(this, {
                  key: 'total',
                  domain: 'combineConfig',
                  root: true
                })} />
            </div>
          </div>
          { this.state.combineConfig.list.map( (item, index) => (
          <div key={`combine-${item.name}-${index}`} className="row-custom">
            <div className="form-group bg-success">
              { index + 1}
            </div>
            <div className="form-group">
              ￥
              <input type="number" className="form-control" placeholder="Market Share" defaultValue={item.marketShare}
                onKeyUp={this.setStateByKey.bind(this, {
                  key: 'marketShare',
                  domain: 'combineConfig',
                  index
                })}/>
            </div>
            <div className="form-group">
              <input type="number" className="form-control" placeholder="Percentage" readOnly value={item.percentage}/>
              %
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" defaultValue={item.name}
                onBlur={this.setStateByKey.bind(this, {
                  key: 'name',
                  domain: 'combineConfig',
                  index
                })} />
            </div>
          </div>
          ))}
        </form>
      </section>
    </Layout>
    );
  }
}