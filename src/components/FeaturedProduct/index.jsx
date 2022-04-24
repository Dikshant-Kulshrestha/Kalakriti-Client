import { useState, useEffect } from "react";
import { RiAuctionLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getHomepageProduct } from "../../apis";

const FeaturedProduct = () => {
  const [timeLeft, setTimeLeft] = useState("xx:xx:xx");
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchRequest = async () => {
      const response = await getHomepageProduct();
      setProduct(response.data[0]);
      return response;
    };

    fetchRequest();
  }, []);

  useEffect(() => {
    if (!product || !product.endTs) return;

    const intervalId = setInterval(() => {
      setTimeLeft(getTime(product.endTs));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [product]);

  const getTime = (datestring) => {
    const timestamp = (Date.parse(datestring) - Date.now()) / 1000;

    const hours = Math.floor(timestamp / (60 * 60));
    const minutes = Math.floor((timestamp / 60) % 60);
    const seconds = Math.floor((timestamp / 1) % 60);

    return (
      String(hours).padStart(2, 0) +
      ":" +
      String(minutes).padStart(2, 0) +
      ":" +
      String(seconds).padStart(2, 0)
    );
  };

  const getPrice = (product) => {
    if (!product.bids) return;
    if (!product.bids.length) return product.basePrice;
    return product.bids[product.bids.length - 1].amount;
  };

  if (!product || !product.title) return null;
  return (
    <div className="featured">
      <div className="product-content">
        <div className="product-title">{product.title}</div>
        <div className="product-subtext">Uses Natural Gemstones that feel nice to wear and touch</div>
        {/* <div className="product-subtext">{product.description}</div> */}
        <div className="product-cta">
          <div className="price">₹ {getPrice(product)}</div>
          <Link to={`/product/${product._id}`}>
            <div className="bid">
              <RiAuctionLine />
            </div>
          </Link>
        </div>
        <div className="product-duration">Time Left {timeLeft}</div>
      </div>

      <div className="product-image">
        <img alt="" src={product.images[0].url} />
      </div>
    </div>
  );
};

export default FeaturedProduct;
