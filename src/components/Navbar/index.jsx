import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { Kalakriti } from "../../assets/images/svgs";
import "./style.css";

const navData = [
  { title: "Explore", link: "/explore" },
  { title: "List", link: "/list" },
];

const Navbar = ({ width }) => {
  return (
    <nav className={width === "full" ? "navFull" : "navHalf"}>
      {width === "full" ? (
        <Link to="/">
          <img className="navLogo" src={Kalakriti} alt="" />
        </Link>
      ) : (
        <div className="search">
          <RiSearchLine />
        </div>
      )}

      <div className="content">
        {navData.map((link, idx) => (
          <Link key={idx} to={link.link}>
            {link.title}
          </Link>
        ))}

        <div className="menu">
          <span className="line1" />
          <span className="line2" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
