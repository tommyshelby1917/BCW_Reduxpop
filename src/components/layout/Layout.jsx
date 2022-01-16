import Header from './Header/Header';
import Footer from './Footer/Footer';

import './Layout.css';

function Layout({ children, title, ...props }) {
  return (
    <div className="layout">
      <Header className="layout-header"></Header>
      <main className="layout-main">
        <h2 className="title-page">{title}</h2>
        <section className="layout-content">{children}</section>
      </main>
      <footer className="layour-footer">
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default Layout;
