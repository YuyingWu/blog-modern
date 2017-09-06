import React from 'react';
import Layout from '../components/layout';

class About extends React.Component {
  render () {
    return (
      <Layout>
        <p>hello, blog, { this.props.blog.total }</p>
      </Layout>
    );
  }
}

export default About;