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
     <html lang="zh-CN" {...htmlAttrs}>
       <Head>
         <title>吾悠杂货铺 | 伍酱</title>
         <meta charSet="utf-8" />
         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
         <meta name="viewport" content="width=device-width,initial-scale=1,minimal-ui"/>
         <link href="/static/bootstrap.css" rel="stylesheet" />
         <link href="//at.alicdn.com/t/font_2ddoibpy163nxw29.css" rel="stylesheet" />
         
         <div dangerouslySetInnerHTML={{__html: "<!--[if lt IE 9]><script src=\"/static/html5shiv.js\"></script><script src=\"/static/respond.js\"></script><![endif]-->" }}/>
      
         {helmet.title.toComponent()}
         {helmet.meta.toComponent()}
         {helmet.link.toComponent()}
       </Head>
       <body {...bodyAttrs}>
        <style jsx global>{`
          html{
            font-size: 62.5%!important;
          }
          body{
            font-size: 1.4rem!important;
          }
        `}</style>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}