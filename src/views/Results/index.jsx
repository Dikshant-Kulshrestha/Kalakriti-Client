import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import ExploreProduct from "../../components/ExploreProduct";

import { getSearchResults } from "../../apis";

import { RiSearch2Line } from "react-icons/ri";
import "../Explore/style.css";
import "./style.css";


const Results = ({ setIsAuthenticated }) => {
  const params = useParams();
  const [ searchResults, setSearchResults ] = useState(null);

  useEffect(() => {
    const fetchExplore = async () => {
      const response = await getSearchResults({ query: params.query });
      setSearchResults(response.data);
    };

    fetchExplore();
  }, [ params ]);

  if (!searchResults) return null;

  return (
    <>
      <Navbar width="full" setIsAuthenticated={setIsAuthenticated} />

      <main className="ExploreMain">
        <h1 className="ExploreHeader">Search</h1>

        <section className="ResultBanner">
          <div className="ResultInformation">
            <span className="ResultAge">Showing Results for</span>

            <span className="ResultTitle">
              {params.query}
            </span>
          </div>

          <RiSearch2Line style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }} size={60} />

          <div className="ResultOverview">
            {searchResults.length} Products Found
          </div>
        </section>

        <section className="ExploreItems">
          {searchResults.map((product) => (
            <ExploreProduct key={product._id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Results;
