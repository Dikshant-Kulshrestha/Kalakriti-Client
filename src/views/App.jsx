import { useState, useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import { Login, Register, Homepage, Explore, List, Product } from "./index";

import "../assets/styles/App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, []);

  if (isAuthenticated === null) return;

  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route index element={<Homepage />} />

        <Route path="list" element={<List />} />
        <Route path="explore" element={<Explore />} />
        <Route path="product">
          <Route path=":pId" element={<Product />} />
        </Route>
      </Route>
    </Routes>
  );
};

const PrivateRoute = ({ isAuthenticated }) => {
  const location = useLocation();

  if (isAuthenticated) return <Outlet />;
  else return <Navigate to="/login" replace state={{ from: location }} />;
};

export default App;
