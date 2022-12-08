import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row w-full h-20 px-10 justify-evenly items-center shadow-lg bg-primary border-t-2 border-black/25">
      <p className='font-semibold text-white tracking-wider'>© 2022 Company Name</p>
      <ul className="flex gap-6 text-lg">
        <li>
          <a className='text-white' href="#">
            <FaTwitter size={24} />
          </a>
        </li>
        <li>
          <a className='text-white' href="#">
            <FaLinkedin size={24} />
          </a>
        </li>
        <li>
          <a className='text-white' href="#">
            <FaGithub size={24} />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer;
