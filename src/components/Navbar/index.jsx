import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiHistoryLine, RiLogoutBoxLine, RiMenu4Line, RiSearchLine, RiUser3Line } from "react-icons/ri";
import { Kalakriti } from "../../assets/images/svgs";
import "./style.css";

const navData = [
  { title: "Explore", link: "/explore" },
  { title: "List", link: "/list" },
];

const getUser = () => {
  const user = window.localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return {};
};

const Navbar = ({ setIsAuthenticated, width }) => {
  const navigate = useNavigate();
  const [ menuOpen, setMenuOpen ] = useState(false);
  const menuRef = useRef(null);
  const userRef = useRef(getUser());

  useEffect(() => {
    const clickListener = (event) => {
      if (menuRef.current && menuOpen && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.body.addEventListener("click", clickListener);

    return () => {
      document.body.addEventListener("click", clickListener);
    };
  }, [ menuOpen ]);

  const handleProfileClick = () => {
    setMenuOpen((oldProfileOpen) => !oldProfileOpen);
  };

  const handleUserClick = () => {
    navigate("/u/" + userRef.current.id);
  };

  const handleHistoryClick = () => {
    navigate("/history");
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
  };

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

        <div className="profileContainer" ref={menuRef}>
          <div className="profile" onClick={handleProfileClick}>
            <RiMenu4Line />
          </div>
          <div className={"dropdown" + (menuOpen ? " open" : "")}>
            <div onClick={handleUserClick}>
              <RiUser3Line />
              <span>{userRef.current.name}</span>
            </div>

            <div onClick={handleHistoryClick}>
              <RiHistoryLine />
              <span>Your Bids</span>
            </div>

            <div onClick={handleLogout}>
              <RiLogoutBoxLine />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
