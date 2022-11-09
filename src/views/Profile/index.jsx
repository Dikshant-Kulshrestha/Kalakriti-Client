import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import ExploreProduct from "../../components/ExploreProduct";

import { getRelativeTime } from "../../utils";
import { getSellerDetails } from "../../apis";

import { RiAwardLine, RiStarFill, RiStarLine, RiVipDiamondLine } from "react-icons/ri";
import "../Explore/style.css";
import "./style.css";


const Explore = ({ setIsAuthenticated }) => {
  const params = useParams();
  const [ sellerData, setSellerData ] = useState(null);

  useEffect(() => {
    const fetchExplore = async () => {
      const response = await getSellerDetails({ user: params.uId });
      setSellerData(response.data);
    };

    fetchExplore();
  }, [ params ]);

  if (!sellerData) return null;

  return (
    <>
      <Navbar width="full" setIsAuthenticated={setIsAuthenticated} />

      <main className="ExploreMain">
        <section className="SellerBanner">
          <div className="SellerInformation">
            <span className="SellerTitle">
              {sellerData.seller.firstName} {sellerData.seller.lastName}
            </span>

            <div className="SellerAge">
              <RiAwardLine />
              <span>Joined {getRelativeTime(new Date(sellerData.seller.createdAt))}</span>
            </div>
          </div>

          <span className="SellerBannerIcon">
            <RiVipDiamondLine size={60} />
          </span>

          <div className="SellerOverview">
            <div>
              {sellerData.listings.length} Products Listed
            </div>

            <div className="SellerRating">
              {[...Array(5)].map((_, idx) => (
                <span key={idx}>
                  {idx + 1 <= (sellerData.ratings.average) ? (
                    <RiStarFill size={20} />
                  ) : (
                    <RiStarLine size={20} />
                  )}
                </span>
              ))}
              <span>({sellerData.ratings.count})</span>
            </div>
          </div>
        </section>

        <section className="ExploreItems">
          {sellerData.listings.map((product) => (
            <ExploreProduct key={product._id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Explore;
