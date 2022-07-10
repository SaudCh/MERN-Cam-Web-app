import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import "./myCreations.css";
import Menu from "../../components/Navbar/Navbar";
import FileInput from "../FileInput";

function MyCreations() {
  const [creations, setCreate] = useState([]);
  const [data, setData] = useState({
    title: "",
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


  const getAllCreations = async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/creation/author/${user._id}`
      );
      console.log(data)
      setCreate(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCreations();
  }, []);

  const createCreation = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + "/creation", data);
      console.log(res)

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <div className="get-container">
        <Menu />
        {creations.map((create, index) => (
          <div className="get-container.img" key={index}>
            <Link to={`/creation/${create._id}`} className="link">
              <div className="get-img">
                <img src={create.img[0]} alt="" className="fpImg" />
                <div className="get-name">
                  <span className="creationName">{create.name}</span>
                  <span className="creationDate">
                    {new Date(create.createdAt).toDateString()}
                  </span>
                  <div className="creationArtist">
                    <span>{create.artist}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </>
  );
}

export default MyCreations;
