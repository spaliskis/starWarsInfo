import { Link } from "react-router-dom";
import { FaInfoCircle, FaFilm } from "react-icons/fa";

const Sidebar = () => {
  return (
    <nav className="w-full sm:w-52 bg-gray-900 text-white text-lg sticky top-0 sm:h-screen z-10">
      <div className="flex items-center justify-center h-12 sm:h-16">
        <span className="text-xl font-bold">Star Wars Info</span>
      </div>
      <ul className="flex sm:flex-col flex-grow">
        <li className="px-6 hover:bg-gray-800 cursor-pointer">
          <Link to="/about" className="flex items-center w-full h-full">
            <span className="mr-3">
              <FaInfoCircle />
            </span>
            About
          </Link>
        </li>
        <li className="py-4 px-6 hover:bg-gray-800 cursor-pointer">
          <Link to="/films" className="flex items-center w-full h-full">
            <span className="mr-3">
              <FaFilm />
            </span>
            Films
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
