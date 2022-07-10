import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../header/Header";
import "./single.css";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Update from "../Update/Update";

const Single = (_) => {
  const [create, setCreate] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  //GET ONE
  const getAllCreations = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `/creation/${id}`
      );
      setCreate(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCreations();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  useEffect(() => {}, [deleted, create]);

  //DELETE POST
  function deletePost() {
    axios
      .delete(process.env.REACT_APP_API_URL + `/creation/${id}`)
      .then((res) => {
        // alert("Post deleted!");
        setDeleted(true);
        if (res.statusText === "OK") {
        }
      });
  }

  if (loading) {
    return <h1>loading...</h1>;
  } else {
    return (
      <div>
        <Navbar />
        <Header />
        <div className="single-container">
          <div className="single-title">{create.name}</div>
          <div className="single-artist">{create.artist}</div>
          <div>
            <img className="single-img" src={create.img} alt="" />
          </div>

          <div className="single-form">
            <FontAwesomeIcon
              icon={faTrash}
              size="2x"
              className="single-trash"
              onClick={deletePost}
            />{" "}
            <Update />
          </div>

          {deleted && <Navigate to="/create" replace={true} />}
        </div>

        <Footer />
      </div>
    );
  }
};
export default Single;
