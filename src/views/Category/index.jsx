import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import ExploreProduct from "../../components/ExploreProduct";

import { getCategoryProducts } from "../../apis";
import "../Explore/style.css";

const Explore = ({ setIsAuthenticated }) => {
  const params = useParams();
  const [ categoryData, setCategoryData ] = useState(null);
  const [ exploreData, setExploreData ] = useState([]);

  useEffect(() => {
    console.log('p', params)

    const fetchExplore = async () => {
      const response = await getCategoryProducts({ category: params.category });
      setCategoryData(response.data.category);
      setExploreData(response.data.products);
    };

    fetchExplore();
  }, [ params ]);

  return (
    <>
      <Navbar width="full" setIsAuthenticated={setIsAuthenticated} />

      <main className="ExploreMain">
        <h1 className="ExploreHeader">Explore{ categoryData ? ` / ${categoryData.title}` : "" }</h1>

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
