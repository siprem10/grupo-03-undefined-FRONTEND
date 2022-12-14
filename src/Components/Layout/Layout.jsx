import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col grow w-full h-full bg-primary">
      <Header />
      <main className="flex flex-row grow justify-center items-center py-20 px-5 text-white gap-5">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
