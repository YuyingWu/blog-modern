import Link from 'next/link';
import cxs from 'cxs';

const cx = {
  nav: cxs({
    width: '100%',
    height: '56px',
    background: '#2e928a',
    display: 'flex',
    justifyContent: 'space-between',
    ' > a':{
      lineHeight: '56px',
      color: '#fff',
      textDecoration: 'none',
      paddingLeft: '12px',
      paddingRight: '12px'
    }
  }),
  navTitle: cxs({
    fontSize: '24px'
  })
}

export default ({ children }) => 
<div>
  <nav className={cx.nav}>
    <Link href="/">
      <a className={cx.navTitle}>伍酱</a>
    </Link>
    <a href="/blog/">Blog</a>
  </nav>

  <main>
    { children }
  </main>

  <footer>
    &copy; 2014-{(new Date()).getFullYear()}
  </footer>
</div>