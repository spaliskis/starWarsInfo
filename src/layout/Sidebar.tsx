import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/films">Films</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
