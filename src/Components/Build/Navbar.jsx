import { useState } from 'react';
import { NavLink } from 'react-router';
import Navbar_Data from '../../Assets/Data/Navbar_Data';
import Navlogo from '../../Assets/Img/NavLogo.jpg';
import { Menu, X } from 'lucide-react';
import useTheme from '../../Hooks/useTheme';
import { PiSunFill } from "react-icons/pi";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, changeTheme } = useTheme();
  const isDark = theme === 'dark';

  const navClass = `py-4 px-6 shadow-md border rounded-xl transition-colors duration-300 w-full z-50
    ${isDark ? 'bg-zinc-900 border-zinc-700 text-gray-200' : 'bg-white border-blue-200 text-gray-800'}`;

  const linkBase = `flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 font-semibold w-full`;
  const activeLink = isDark
    ? 'bg-blue-800 text-white relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-400'
    : 'bg-blue-100 text-blue-700 shadow-inner relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600';
  const inactiveLink = isDark
    ? 'hover:bg-zinc-800'
    : 'hover:bg-blue-50 hover:text-blue-500';

  return (
    <nav className={navClass} role="navigation">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full ring-2 ring-blue-400 shadow-sm"
            src={Navlogo}
            alt="Hermes Logo"
          />
          <h2 className={`font-extrabold text-xl tracking-wide ${isDark ? 'text-white' : 'text-blue-600'}`}>
            Hermes
          </h2>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-6 items-center">
          {Navbar_Data?.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : inactiveLink}`
                }
              >
                <span>{item.name}</span>
                <span className="text-blue-400 text-2xl">
                  <item.icon />
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Theme + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={changeTheme}
            className={`p-3 rounded-full transition-all duration-300 border
              ${isDark
                ? 'bg-zinc-800 text-slate-300 border-zinc-600 hover:bg-zinc-700'
                : 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100'}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <FaMoon className="transition-transform duration-300 transform hover:rotate-180" />
            ) : (
              <PiSunFill className="transition-transform duration-300 transform hover:rotate-180" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={`${isDark ? 'text-white' : 'text-blue-600'} lg:hidden p-2`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      <div
        className={`lg:hidden mt-3 transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col gap-2 pt-2">
          {Navbar_Data?.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : inactiveLink}`
                }
              >
                <span>{item.name}</span>
                <span className="text-blue-400 text-2xl">
                  <item.icon />
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
