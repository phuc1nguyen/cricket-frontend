import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Searchbar, HamburgerMenu } from '@components/index';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import cricketLogo from 'public/images/logo-white-transparent.png';

const Header = () => {
  return (
    <header id="header" className="fixed w-full bg-cricket_dark text-sm py-2 z-10">
      <div className="flex items-center sm:w-5/6 mx-auto">
        <nav className="flex items-center mr-auto">
          <Link href="/" className="w-16 mr-2 pl-4 sm:pl-0">
            <Image src={cricketLogo} className="hover:opacity-60" alt="logo" priority />
          </Link>
          <Navbar />
        </nav>

        <div className="user-info flex items-center sm:w-1/3">
          <Searchbar />
          <ul className="flex items-center gap-5 px-4 ml-auto text-white">
            <li className="flex items-center text-2xl md:hidden">
              <FiSearch />
            </li>
            <li className="hidden md:flex items-center text-2xl cursor-pointer">
              <FiShoppingCart />
            </li>
            <li className="hidden md:flex items-center text-2xl">
              <label htmlFor="my-modal" className="cursor-pointer">
                <FiUser />
              </label>
            </li>
            <li className="flex items-center md:hidden">
              <HamburgerMenu />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;