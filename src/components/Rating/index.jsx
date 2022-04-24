import { useState } from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { addRating } from "../../apis";
import "./style.css";

const Rating = ({ pId, setProductData, initialRating }) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(initialRating || 0);

  const handleRating = async (stars) => {
    const response = await addRating({ pId, stars });
    if (!response.error) {
      toast(response.message, { type: "success" });
      setProductData(response.data);
    }
  };

  const handleClick = (stars) => {
    setRating(stars);
    handleRating(stars);
  };

  return (
    <>
      {[...Array(5)].map((star, idx) => (
        <span
          key={idx}
          className="ProductRating"
          onClick={() => handleClick(idx + 1)}
          onMouseEnter={() => setHover(idx + 1)}
          onMouseLeave={() => setHover(rating)}
        >
          {idx + 1 <= (hover || rating) ? (
            <RiStarFill color="#FFB72B" size={"18px"} />
          ) : (
            <RiStarLine color="#FFB72B" size={"18px"} />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
