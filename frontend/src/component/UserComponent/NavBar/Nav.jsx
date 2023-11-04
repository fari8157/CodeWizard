import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Add the 'dark' class to the HTML's documentElement when dark mode is active
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <img src="public/logo.jpg" alt="Logo" className="h-8 w-8" />
          <span className="text-black text-lg font-bold ml-2">CodeWizard</span>
        </div>
        <div className={`mt-4 md:mt-0 space-x-4 ${menuOpen ? 'block' : 'hidden md:block'}`}>
          <a href="#" className="text-black">Home</a>
          <a href="#" className="text-black">Courses</a>
          <a href="#" className="text-black">About Us</a>
          <a href="#" className="text-black">Blog</a>
          <a href="#" className="text-black">Profile</a>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Login</button>
        <button
          onClick={toggleMenu}
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
