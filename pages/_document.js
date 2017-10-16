import Document, { Head, Main, NextScript } from 'next/document';
import cxs from 'cxs';

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const page = renderPage()
    const style = cxs.css()
    return { ...page, style }
  }

  render () {
    return (
      <html>
        <Head>
          <title>My page</title>
          {/*<link href="http://sinacloud.net/woodysblog/statics/normalize.min.css" rel="stylesheet"/>*/}
          <link href="//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" rel="stylesheet" />
          <style id='cxs-style' dangerouslySetInnerHTML={{ __html: this.props.style }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}