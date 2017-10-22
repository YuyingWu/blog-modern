import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import {Helmet} from "react-helmet"

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    const helmet = Helmet.renderStatic();
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();
      
    return (
     <html {...htmlAttrs}>
       <Head>
         <title>吾悠杂货铺 | 伍酱</title>
         <meta name="viewport" content="width=device-width,initial-scale=1,minimal-ui"/>
         <link href="/static/normalize.css" rel="stylesheet" />
         <link href="//at.alicdn.com/t/font_2ddoibpy163nxw29.css" rel="stylesheet" />
         {helmet.title.toComponent()}
         {helmet.meta.toComponent()}
         {helmet.link.toComponent()}
       </Head>
       <body {...bodyAttrs}>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}