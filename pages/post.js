import Layout from '../components/layout';

export default class extends React.Component {
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