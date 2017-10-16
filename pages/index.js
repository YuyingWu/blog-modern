import Layout from '../components/layout';
import React from 'react';
import Link from 'next/link';
import cxs from 'cxs';

/*const cx = {
  root: cxs({
    width: 80,
    height: 60,
    background: 'white',
    ':hover': {
      background: 'black'
    }
  }),

  title: cxs({
    marginLeft: 5,
    color: 'red',
    fontSize: 22,
    ':hover': {
      color: 'white'
    }
  })
}*/

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <p>hello, next</p>

        <div>
          <h1>My page</h1>
        </div>
      </Layout>
    );
  }
}