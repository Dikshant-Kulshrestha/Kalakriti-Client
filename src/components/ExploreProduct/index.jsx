import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const ExploreProduct = ({ product }) => {
  const [timeLeft, setTimeLeft] = useState("xx:xx:xx");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTime(product.endTs));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [product.endTs]);

  const getPrice = (product) => {
    if (!product.bids.length) return product.basePrice;
    return product.bids[product.bids.length - 1].amount;
  };

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

  return (
    <Link to={`/product/${product._id}`} className="ExploreProductLink">
      <article className="ExploreProduct" key={product._id}>
        <div className="ExploreProductPrice">₹ {getPrice(product)}</div>

        <div
          className={`ExploreProductImage ${Date.parse(product.endTs) <= Date.now() && "ExploreProductSold"}`}
        >
          <img alt="product" src={product.images[0].url} />
        </div>
        <div className="ExploreProductMeta">
          <div className="ExploreProductTitle">{product.title}</div>
          <div className="ExploreProductDescription">{product.description}</div>
        </div>

        {Date.parse(product.endTs) >= Date.now() ? (
          <div className="ExploreProductTime">
            <span className="ExploreProductTimeHeader">Time Left:</span>
            <span className="ExploreProductTimeDetail">{timeLeft}</span>
          </div>
        ) : (
          <div className="ExploreProductTime">
            <span className="ExploreProductTimeHeader">Complete {"✓"}</span>
          </div>
        )}
      </article>
    </Link>
  );
};

export default ExploreProduct;
