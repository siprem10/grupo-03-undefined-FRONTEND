import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center w-full h-20 px-10 shadow-lg bg-orange-200 justify-evenly">
      <p>© 2020 Company Name</p>
      <div className="flex">
        <ul className="social flex gap-2 text-lg">
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="#">
              <FaGithub />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
