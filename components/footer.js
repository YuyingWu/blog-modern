import React, { PureComponent } from 'react';

export default class extends PureComponent {
  render() {
    return (
      <footer className="wgt-footer">
        <style jsx>{`
          .wgt-footer {
            font-size: 1.2rem;
            padding: 20px 0 10px;
            text-align: center;
          }
          .wgt-footer p {
            line-height: 1;
          }
          .v-split{
            margin: 0 5px;
          }
          .wgt-footer a{
            color: #000;
          }
        `}</style>
        <p>&copy; 2014-{ (new Date()).getFullYear() }&nbsp;
          <a href="http://www.wuyuying.com/blog/">伍酱</a>
          <span className="v-split">|</span>
          <a href="https://github.com/YuyingWu">Github</a>
          <span className="v-split">|</span>
          <a href="http://www.weibo.com/wuyuying1128">微博</a>
          <span className="v-split">|</span>
          <a href="http://www.douban.com/people/wuyuying1128/">豆瓣</a>
        </p>
        <p>京ICP备16019960号</p>
      </footer>
    );
  }
}