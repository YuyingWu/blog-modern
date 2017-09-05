import Link from 'next/link';

export default ({ children }) => 
<div>
  <nav>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
  </nav>

  <main>
    { children }
  </main>

  <footer>
    &copy; 2014-{(new Date()).getFullYear()}
  </footer>
</div>