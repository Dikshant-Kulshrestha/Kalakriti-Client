import Navbar from "../../components/Navbar";
import { RiTornadoLine } from "react-icons/ri";

import FeaturedProduct from "../../components/FeaturedProduct";

import { Kalakriti } from "../../assets/images/svgs";
import "./style.css";

const Homepage = () => {
  return (
    <header className="HomeHeader">
      <Navbar />

      <div className="left">
        <div className="tag">
          <img src={Kalakriti} alt="" />
        </div>
      </div>

      <div className="page">
        <div className="page-title">
          <div className="sub-title">Directly from Artists</div>

          <div className="title">
            Find Your Thing
            <span className="title-icon">
              <RiTornadoLine />
            </span>
          </div>
        </div>

        <div className="glass">
          <div className="glass-text">
            <span className="glass-1">Give the Gift of</span>
            <span className="glass-2">Handmade</span>
          </div>
        </div>

        <div className="page-links">
          <div>GitHub</div>
        </div>

        <FeaturedProduct />
      </div>
    </header>
  );
};

export default Homepage;
