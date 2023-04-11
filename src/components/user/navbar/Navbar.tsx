import Link from 'next/link';

interface NavbarInterface {
  title: string;
  url: string;
}

const navbarContents: NavbarInterface[] = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Categories',
    url: '/categories',
  },
  {
    title: 'Blog',
    url: '/blog',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
];

const Navbar = () => {
  return (
    <ul className="hidden md:flex items-center mr-auto">
      {navbarContents.map((item) => (
        <li key={item.title} className="font-bold text-white hover:text-gray-300">
          <Link href={item.url} className="px-4 py-2">
            {item.title.toLocaleUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;