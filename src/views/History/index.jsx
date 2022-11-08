import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import HistoryProduct from "../../components/HistoryProduct";

import { getUserBids } from "../../apis";
import "./style.css";

const Explore = ({ setIsAuthenticated }) => {
  const [ bidData, setBidData ] = useState([]);

  useEffect(() => {
    const fetchUserBids = async () => {
      const user = JSON.parse(window.localStorage.getItem("user"));
      console.log('user', user)
      
      const response = await getUserBids({ owner: user.id });
      setBidData(response.data);
    };

    fetchUserBids();
  }, []);

  return (
    <>
      <Navbar width="full" setIsAuthenticated={setIsAuthenticated} />

      <main className="ExploreMain">
        <h1 className="ExploreHeader">Your Bids</h1>

        <section className="ExploreItems">
          {bidData.map((product) => (
            <HistoryProduct key={product._id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Explore;
