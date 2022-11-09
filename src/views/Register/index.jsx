import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../apis";
import Grid from "../../assets/images/jpgs/grid.png";
import "./style.css";

const initialForm = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  phone: "",
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);

  const handleInputChange = (value, key) => {
    const newData = { ...formData };
    newData[key] = value;

    setFormData(newData);
  };

  const handleNumberChange = (value, key) => {
    if (Number(value) || value === "") {
      handleInputChange(value, key);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(formData);

    if (response.error) toast(response.error, { type: "error" });
    else {
      toast(response.data, { type: "success" });
      navigate("/login");
    }
  };

  return (
    <main className="AuthMain">
      <div className="AuthSection">
        <div className="AuthLeft" style={{ backgroundImage: `url(${Grid})` }}></div>

        <div className="AuthRight">
          <form className="AuthForm" onSubmit={handleSubmit}>
            <h1 className="AuthHeader">Sign Up</h1>
            <input
              value={formData.fName}
              onChange={(e) => handleInputChange(e.target.value, "fName")}
              type="text"
              name=""
              id="fname"
              placeholder="First Name"
            />
            <input
              value={formData.lName}
              onChange={(e) => handleInputChange(e.target.value, "lName")}
              type="text"
              name=""
              id="lname"
              placeholder="Last Name"
            />
            <input
              value={formData.phone}
              onChange={(e) => handleNumberChange(e.target.value, "phone")}
              type="text"
              placeholder="Phone Number"
              id="no"
            />
            <input
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.value, "email")}
              type="email"
              placeholder="Email Address"
              id="mail"
            />

            <input
              value={formData.password}
              onChange={(e) => handleInputChange(e.target.value, "password")}
              type="password"
              placeholder="Password"
              id="pass"
            />
            <button className="AuthButton">Submit</button>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
