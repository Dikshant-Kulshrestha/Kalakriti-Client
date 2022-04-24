import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../apis";
import Grid from "../../assets/images/jpgs/grid.png";
import "./style.css";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [navigate, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({ email, password });

    if (response.error) toast(response.error, { type: "error" });
    else {
      toast("Logged in Successfully", { type: "success" });
      window.localStorage.setItem("user", JSON.stringify(response.jwt));
      setIsAuthenticated(true);
      navigate("/");
    }
  };
  return (
    <main className="AuthMain">
      <div className="AuthSection">
        <div className="AuthLeft">
          <img className="AuthImg" alt="Kalakriti" src={Grid} />
        </div>

        <div className="AuthRight">
          <form className="AuthForm" onSubmit={handleSubmit}>
            <h1 className="AuthHeader">Sign In</h1>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              id="mail"
            ></input>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="pass"
            ></input>

            <button className="AuthButton">Submit</button>
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
