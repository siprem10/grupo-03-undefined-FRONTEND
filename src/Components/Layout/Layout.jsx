import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full bg-primary">
      <Header />
        <main className="flex flex-row grow justify-center items-center text-white">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
