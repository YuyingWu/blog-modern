import Layout from '../components/layout';
import React from 'react';
// import { createClient } from 'contentful';
import Link from 'next/link';
import Head from 'next/head';
import { stylesheet, classNames } from '../styles/style.css';

// const client = createClient({
//   // This is the space ID. A space is like a project folder in Contentful terms 
//   space: '07c3fee5zt61',
//   // This is the access token for this space. Normally you get both ID and the token in the Contentful web app 
//   accessToken: '3674559aa73f2d2b5b461d97299df2df699e9a1eede74a8adb8def371c217be1'
// });

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
    // console.log(this.props.res);

    return (
      <Layout>
        <p>hello, next</p>
        <p className={classNames.paragraph}>
          <Head><style dangerouslySetInnerHTML={{__html: stylesheet}} /></Head>
          postcss
        </p>
      </Layout>
    );
  }
}