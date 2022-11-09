import { RiAuctionLine, RiTimeLine, RiTrophyLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./style.css";

const HistoryProduct = ({ product }) => {
  const user = JSON.parse(window.localStorage.getItem("user"));

  const handleBidClick = (event) => {
    event.preventDefault();
  };

  return (
    <Link to={`/product/${product._id}`} className="HistoryProductLink">
      <article className="HistoryProduct">
        <div className="HistoryProductImage" style={{ backgroundImage: `url(${product.images[0].url})` }} />

        <div className="HistoryProductMeta">
          <span className="HistoryProductTitle">{product.title}</span>

          <div className="HistoryProductDescription">{product.description}{product.description}</div>

          <div className="HistoryProductBids">
            {product.bids.slice(Math.max(product.bids.length - 3)).reverse().map((bid) => (
              <div key={bid._id} className="HistoryProductBid" onClick={handleBidClick}>
                <span><RiAuctionLine /></span>
                <span>₹{bid.amount}</span>
              </div>
            ))}
            {(product.bids.length > 3) && (
              <div className="HistoryProductBid" onClick={handleBidClick}>
                <span><RiAuctionLine /></span>
                <span className="HistoryProductMore">+ {product.bids.length - 3} more</span>
            </div>
            )}
          </div>

          <div className="HistoryProductStatus">
            {(product.winner && product.winner.user === user.id) ? (
              <div className="HistoryProductStatusWin">
                <RiTrophyLine />
                <span>Purchased</span>
              </div>
            ) : (
              <div className="HistoryProductStatusDone">
                <RiTimeLine />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default HistoryProduct;
