import React from 'react';
import Link from 'next/link';
import { Helmet } from "react-helmet";

export default class Error extends React.Component {
  /*static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }*/

  render() {
    return (
      <div className="page-error">
        <Helmet>
            <title>404 | 吾悠杂货铺</title>
        </Helmet>
        <style jsx global>{`
            html{
                font-size: 62.5%;
            }
            body{
                font-size: 1.4rem;
                background: #2710f2!important;
            }
            *::selection{
                color: #49ffb9;
                background: #000;
            }
        `}</style>
        <style jsx>{`
        .page-error{
            transform: translateY(50%);
            color: #fff;
            text-align: center;
            font-family: monospace, 'Hiragino Sans GB', 'tahoma', 'PingFang SC', 'WenQuanYi Micro Hei', 'Microsoft YaHei', 'arial', 'sans-serif';
        }
        .page-error a{
            color: #fff;
            text-decoration: underline;
        }
        .page-error p{
            text-align: left;
            max-width: 54rem;
            padding: 0 3rem;
            margin: 2rem auto;
            font-size: 1.6rem;
        }
        .title{
            margin: 0;
            background: #ccc;
            color: #2710f2;
            display: inline-block;
            font-size: 2rem;
            padding: 0 0.25em;
        }
        .page-error p.text-right{
            text-align: right;
        }
        `}</style>
        
        <main>
            <h1 className="title">404 error</h1>
            <p> An error has occurred. To continue: </p>
            <p><Link href="/"><a>Click Here</a></Link> to return to the index, or</p>
            <p>Press CTRL+ALT+DEL to restart your computer. If you do this, you will lose any unsaved data in all open applications.</p>
            <p>Error: 404 : hi it's Yuying Wu.</p>
            <p className="text-right"><a href="https://github.com/YuyingWu">Click here</a> to continue _</p>
        </main>
      </div>
    )
  }
}