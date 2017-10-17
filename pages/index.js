import Layout from '../components/layout';
import React from 'react';
import Link from 'next/link';
import { Helmet } from "react-helmet";

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <Helmet>
          <title>hello</title>
        </Helmet>
        <style jsx>{`
          img {
            display: block;
            width: 223px;
            height: 223px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 100%;
            margin-top: 5rem;
          }
          h2{
            text-align: center;
            font-size: 2.4rem;
            color: #2e928a;
          }
          ul{
            display: flex;
            justify-content: center;
            margin: 6rem auto 0;
            padding: 0;
          }
          li{
            list-style: none;
            flex: 0 0 60px;
            text-align: center;
          }
          li a{
            font-size: 2.6rem;
            color: #c2d6ce;
            text-decoration: none;
          }
        `}</style>

        <img src="http://cdn.sinacloud.net/demo-static/img/avatar.JPG" />
        
        <h2>Hello, I'm 伍酱</h2>
        
        <ul>
          <li>
            <a href="http://github.com/YuyingWu" target="_blank" className="iconfont icon-github"></a>
          </li>
          <li>
            <a href="http://weibo.com/wuyuying1128" target="_blank" className="iconfont icon-weibo"></a>
          </li>
          <li>
            <a href="https://www.douban.com/people/wuyuying1128/" target="_blank" className="iconfont icon-douban"></a>
          </li>
        </ul>
      </Layout>
    );
  }
}