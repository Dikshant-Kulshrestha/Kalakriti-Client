import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import ExploreProduct from "../../components/ExploreProduct";

import { getExploreProducts } from "../../apis";
import "./style.css";

const Explore = () => {
  const [exploreData, setExploreData] = useState([]);

  useEffect(() => {
    const fetchExplore = async () => {
      const response = await getExploreProducts();
      setExploreData(response.data);
    };

    fetchExplore();
  }, []);

  return (
    <>
      <Navbar width="full" />

      <main className="ExploreMain">
        <h1 className="ExploreHeader">Explore</h1>

        <section className="ExploreItems">
          {exploreData.map((product) => (
            <ExploreProduct key={product._id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Explore;
