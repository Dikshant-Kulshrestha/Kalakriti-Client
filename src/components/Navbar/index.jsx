import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiHistoryLine, RiLogoutBoxLine, RiMenu4Line, RiPriceTag3Line, RiUser3Line } from "react-icons/ri";
import { Kalakriti } from "../../assets/images/svgs";
import "./style.css";
import Search from "../Search";
import { getCategories } from "../../apis";

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
  const userRef = useRef(getUser());

  const [ categories, setCategories ] = useState([]);

  const [ tagOpen, setTagOpen ] = useState(false);
  const tagRef = useRef(null);

  const [ menuOpen, setMenuOpen ] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const clickListener = (event) => {
      if (tagRef.current && tagOpen && !tagRef.current.contains(event.target)) {
        setTagOpen(false);
      }
    };

    document.body.addEventListener("click", clickListener);

    return () => {
      document.body.addEventListener("click", clickListener);
    };
  }, [ tagOpen ]);

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

  const handleTagClick = () => {
    setTagOpen((oldTagOpen) => !oldTagOpen);
  };

  const handleTagSelect = (category) => {
    navigate("/explore/" + category._id);
    setTagOpen(false);
  };

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
        <Search />
      )}

      <div className="content">
        <div className="profileContainer" ref={tagRef}>
          <span className="navLink" onClick={handleTagClick}>
            Categories
          </span>
          <div className={"dropdown tag-dropdown" + (tagOpen ? " open" : "")}>
            {categories.map((category) => (
              <div key={category._id} onClick={() => handleTagSelect(category)}>
                <RiPriceTag3Line />
                <span>{category.title}</span>
              </div>
            ))}
          </div>
        </div>

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
