import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { addBid, viewProduct } from "../../apis";
import { RiTimeLine, RiLineChartLine, RiAuctionLine, RiStarFill } from "react-icons/ri";
import "./style.css";
import Navbar from "../../components/Navbar";
import InputField from "../../components/InputField";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { toast } from "react-toastify";
import { ResponsiveLine } from "@nivo/line";
import Rating from "../../components/Rating";

const iconMargin = { marginRight: "8px" };

const Product = ({ setIsAuthenticated }) => {
  const params = useParams();

  const [productData, setProductData] = useState();
  const [bid, setBid] = useState("");

  useEffect(() => {
    const fetchRequest = async (pId) => {
      const response = await viewProduct(pId);
      setProductData(response.data);
      return await response;
    };

    fetchRequest(params.pId);
  }, [params]);

  const bidData = useMemo(() => {
    if (!productData) return [];

    let ctr = 1;
    const data = [
      {
        id: "bid",
        color: "#000000",
        data: [
          { x: 0, y: productData.basePrice },
          ...productData.bids.map((bid) => ({ x: ctr++, y: bid.amount })),
        ],
      },
    ];

    return data;
  }, [productData]);

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

    return `${month} ${day}, ${year} at ${time}`;
  };

  const handleBidChange = (value) => {
    if (Number(value) || value === "") {
      setBid(value);
    }
  };

  const handleBidding = async () => {
    const response = await addBid({ pId: productData._id, amount: parseInt(bid) });

    if (response.error) toast(response.error, { type: "error" });
    else {
      toast("Bid Added Successfully", { type: "success" });
      setProductData(response.data);
      setBid("");
    }
  };

  const getAmount = (product) => {
    if (product.bids.length) {
      return product.bids[product.bids.length - 1].amount;
    } else return product.basePrice;
  };

  const getAverageRating = (product) => {
    if (!product.owner.ratings.length) return 0;
    return product.owner.ratings.reduce((n, { rating }) => n + rating, 0) / product.owner.ratings.length;
  };

  const renderUnsold = () => {
    return (
      <div className="ProductBiddingContainer">
        <div className="ProductBiddingHeader">
          <RiTimeLine size={"18px"} style={iconMargin} />
          Sale ends {getFormattedDate(productData.endTs)}
        </div>

        <div className="ProductBiddingDetails">
          <div>
            <div className="ProductPriceText">Current Bid</div>
            <div className="ProductBiddingPrice">₹ {getAmount(productData)}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <InputField
              type={"input"}
              value={bid}
              handleChange={({ target }) => handleBidChange(target.value)}
              icon={<span>₹</span>}
            />
            <button className="Button" style={{ width: "150px" }} onClick={handleBidding}>
              <RiAuctionLine style={iconMargin} />
              Bid Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSold = () => {
    const getBuyer = () =>
      productData.bids[productData.bids.length - 1].owner.firstName +
      " " +
      productData.bids[productData.bids.length - 1].owner.lastName;

    return (
      <div className="ProductBiddingContainer">
        <div className="ProductBiddingHeader">
          <RiTimeLine size={"18px"} style={iconMargin} />
          Sale ended {getFormattedDate(productData.endTs)}
        </div>

        <div className="ProductBiddingDetails">
          {productData.bids.length ? (
            <div>
              <span className="ProductPriceText">Sold for</span>
              <span className="ProductBiddingPrice">₹{getAmount(productData)}</span>
              <span className="ProductPriceText">to</span>
              <span className="ProductBiddingPrice">{getBuyer()}</span>
            </div>
          ) : (
            <div>
              <span className="ProductPriceText">Remained Unsold at</span>
              <span className="ProductBiddingPrice">₹ {getAmount(productData)}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderRating = () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    if (
      Date.parse(productData.endTs) < Date.now() &&
      productData.bids.length &&
      productData.bids[productData.bids.length - 1].owner._id === userId
    ) {
      return (
        <div className="ProductBiddingContainer">
          <div className="ProductBiddingHeader">
            <RiStarFill size={"18px"} style={iconMargin} />
            Seller Rating
          </div>

          <div className="ProductBiddingDetails">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>Give Rating</span>{" "}
              <Rating
                pId={productData._id}
                setProductData={setProductData}
                initialRating={productData.rating}
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (!productData) return null;
  return (
    <>
      <Navbar width="full" setIsAuthenticated={setIsAuthenticated} />

      <main className="ProductMain">
        <section className="ProductDisplay">
          <article className="ProductGallery">
            <Carousel showArrows={false} dynamicHeight={true}>
              {productData.images.map((image, idx) => (
                <div key={idx} className="ProductImage">
                  <img key={idx} alt="product" src={image.url} />
                </div>
              ))}
            </Carousel>
          </article>

          <article className="ProductMeta">
            <div className="">
              <div className="ProductTitle">{productData.title}</div>
              <div className="ProductOwner">
                <span>By </span>
                <span className="ProductOwnerColor">
                  {productData.owner.firstName} {productData.owner.lastName}
                </span>
                <span className="ProductOwnerRating">
                  ({getAverageRating(productData)} <RiStarFill />)
                </span>
              </div>
            </div>

            {Date.parse(productData.endTs) >= Date.now() ? renderUnsold() : renderSold()}

            {renderRating()}

            <div className="ProductBiddingContainer">
              <div className="ProductBiddingHeader">
                <RiLineChartLine size={"18px"} style={iconMargin} />
                Pricing History
              </div>
              <div className="ProductBiddingDetails">
                <ResponsiveLine
                  data={bidData}
                  // colors={["7648ce"]}
                  margin={{ top: 25, right: 5, bottom: 30, left: 40 }}
                  enableArea={true}
                  xScale={{ type: "point" }}
                  yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
                  axisBottom={null}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: 3,
                  }}
                  areaBaselineValue={productData.basePrice}
                  enableGridX={false}
                  gridYValues={4}
                  pointSize={10}
                  pointBorderWidth={2}
                  pointLabelYOffset={-12}
                  animate={false}
                />
              </div>
            </div>
          </article>
        </section>

        <section className="ProductReviews"></section>
      </main>
    </>
  );
};

export default Product;
