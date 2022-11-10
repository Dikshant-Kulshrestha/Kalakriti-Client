import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

import { addProduct, getCategories } from "../../apis";
import { RiCalendarTodoLine } from "react-icons/ri";
import "./style.css";

const initialFormData = {
  title: "",
  description: "",
  amount: "",
  endDate: "",
};

const List = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [ categories, setCategories ] = useState([]);

  const [ formData, setFormData ] = useState(initialFormData);
  const [ date, setDate ] = useState("");
  const [ files, setFiles ] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

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

  const handleUpload = (e) => {
    setFiles((old) => [...old, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      ...formData,
      expiryDate: new Date(date),
    };

    const response = await addProduct(request, files);

    if (response.data) {
      toast(response.message);
      navigate(`/product/${response.data._id}`, { replace: true });
    }
  };

  return (
    <>
      <Navbar width="full" setIsAuthenticated={setIsAuthenticated} />

      <main className="ListMain">
        <header className="ListHeader">Add Product</header>

        <section className="ListSection">
          <form className="ListForm" onSubmit={handleSubmit}>
            <InputField
              type={"input"}
              value={formData.title}
              handleChange={(e) => handleInputChange(e.target.value, "title")}
              label={"Title"}
              required
            />
            <InputField
              type={"textarea"}
              value={formData.description}
              handleChange={(e) => handleInputChange(e.target.value, "description")}
              label={"Description"}
              required
            />
            <div className="ListRow">
              <InputField
                type={"input"}
                value={formData.amount}
                handleChange={(e) => handleNumberChange(e.target.value, "amount")}
                label={"Minimum Bid"}
                icon={<span>₹</span>}
                required
              />
              <InputField
                type={"input"}
                value={date}
                handleChange={(e) => setDate(e.target.value)}
                label={"Bidding Expiry"}
                icon={<RiCalendarTodoLine />}
                innerProps={{ type: "datetime-local" }}
                required
              />
            </div>
            <InputField
              type={"input"}
              handleChange={handleUpload}
              label={"Images"}
              innerProps={{ type: "file", multiple: true }}
              required
            />

            <select
              className="SelectField"
              onChange={(e) => handleInputChange(e.currentTarget.value, "category")}
            >
              {categories.map((category) => (
                <option key={category._id} className="SelectOption" value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>

            <div className="ListActions">
              <Button label="Submit" />
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default List;
