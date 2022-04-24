import "./style.css";

const Button = ({ label, handleClick }) => {
  return (
    <button className="Button" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
