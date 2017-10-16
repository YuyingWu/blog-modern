import Document, { Head, Main, NextScript } from 'next/document';
import cxs from 'cxs';

const cx = {
  html: cxs({
    fontSize: '62.5%'
  }),
  body: cxs({
    fontSize: '1.4rem'
  })
}

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const page = renderPage()
    const style = cxs.css()
    return { ...page, style }
  }

  render () {
    return (
      <html className={cx.html}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimal-ui"/>
          {/*<link href="http://sinacloud.net/woodysblog/statics/normalize.min.css" rel="stylesheet"/>*/}
          <link href="//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" rel="stylesheet" />
          <link href="//at.alicdn.com/t/font_2ddoibpy163nxw29.css" rel="stylesheet" />
          <style id='cxs-style' dangerouslySetInnerHTML={{ __html: this.props.style }} />
        </Head>
        <body className={cx.body}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}