import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <main className="flex flex-row grow justify-center items-center">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
