import Layout from '../components/layout';
import React from 'react';
import Link from 'next/link';
import cxs from 'cxs/component';

const Img = cxs('img')({
  display: 'block',
  width: '223px',
  height: '223px',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: '100%'
});
const Title = cxs('h2')({
  textAlign: 'center',
    fontSize: '2.4rem',
    color: '#2e928a'
});

const SocialUl = cxs('ul')({
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '0',
    height: '25px'
});

const SocialLi = cxs('li')({
    listStyle: 'none',
    flex: '0 0 60px',
    textAlign: 'center',
    ' > a': {
      fontSize: '2.6rem',
      color: '#c2d6ce',
      textDecoration: 'none'
    }
});

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <Img src="http://cdn.sinacloud.net/demo-static/img/avatar.JPG" />
        
        <Title>Hello, I'm 伍酱</Title>
        
        <SocialUl>
          <SocialLi>
            <a href="http://github.com/YuyingWu" target="_blank" className="iconfont icon-github"></a>
          </SocialLi>
          <SocialLi>
            <a href="http://weibo.com/wuyuying1128" target="_blank" className="iconfont icon-weibo"></a>
          </SocialLi>
          <SocialLi>
            <a href="https://www.douban.com/people/wuyuying1128/" target="_blank" className="iconfont icon-douban"></a>
          </SocialLi>
        </SocialUl>
      </Layout>
    );
  }
}