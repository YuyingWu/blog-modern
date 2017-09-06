import React from 'react';
import Layout from '../components/layout';
import Blog from '../components/blog';

class Post extends React.Component {
  // static async getInitialProps ({ req }) {
  //   // const fetch = window.fetch;
  //   // const res = await fetch('https://api.github.com/repos/zeit/next.js')
  //   // const json = await res.json()
  //   const res = await client.getEntries({
  //     content_type: '2wKn6yEnZewu2SCCkus4as'
  //   });

  //   return ({
  //     res
  //   });
  // }

  // static getInitialProps({ req }) {
  //   return {};
  // }

  render () {
    const { slug } = this.props.url.query;
console.log(slug);
    return (
      <Layout>
        <style jsx>{`
          p {
            color: red;
          }
        `}</style>
        <p>hello, next</p>
      </Layout>
    );
  }
}

export default Blog(Post);