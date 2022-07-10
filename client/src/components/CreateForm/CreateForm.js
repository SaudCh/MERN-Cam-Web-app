import { useState } from "react";
import axios from "axios";
import FileInput from "../FileInput";
import "./createForm.css";
import Footer from "../Footer/Footer";
import Header from "../header/Header";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    artist: "",
    img: "",
    author: JSON.parse(localStorage.getItem("user")) || null,
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const createCreation = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/creation", data);
      console.log(res)
      navigate("/mycreations");
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <Navbar />
      <Header />
      <div className="i-form-container">
        <form className="create.form" onSubmit={createCreation}>
          <div className="create-input">
            <h1 className="creation-title">CREATE</h1>
            <FileInput
              name="img"
              label="Choose Image"
              handleInputState={handleInputState}
              type="image"
              value={data.img}
            />{" "}
            <input
              type="text"
              maxLength="20"
              className="create-input-field"
              placeholder="Creation Name... max 20 charactters."
              name="name"
              onChange={handleChange}
              value={data.name}
            />
            <input
              type="text"
              maxLength="20"
              className="create-input-field"
              placeholder="Description... max 20 charactters."
              name="artist"
              onChange={handleChange}
              value={data.artist}
            />
          </div>

          <div className="create-submit">
            {" "}
            <button
              type="submit"
              className="submit-btn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateForm;
