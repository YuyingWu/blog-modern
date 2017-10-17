import Link from 'next/link';
import { Helmet } from "react-helmet";

export default ({ children }) => 
<div>
  <style jsx global>{`
    html{
      font-size: 62.5%;
    }
    body{
      font-size: 1.4rem;
    }
  `}</style>
  <style jsx global>{`
    nav{
      width: 100%;
      height: 56px;
      background: #2e928a;
      display: flex;
      justify-content: space-between;
    }
    nav a{
      line-height: 56px;
      color: #fff;
      text-decoration: none;
      padding-left: 12px;
      padding-right: 12px;
      font-size: 1.8rem;
    }
    .navTitle{
      font-size: 2.4rem;
    }
  `}</style>
  <nav>
    <Link href="/">
      <a className="navTitle">伍酱</a>
    </Link>
    <a href="/blog/">Blog</a>
  </nav>

  <main>
    { children }
  </main>

  {/*<footer>
    &copy; 2014-{(new Date()).getFullYear()}
  </footer>*/}
</div>