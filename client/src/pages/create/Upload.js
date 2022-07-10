import { useEffect, useState } from "react";
import axios from "axios";

import CreateForm from "../../components/CreateForm/CreateForm";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import "./upload.css";

function Upload() {
  const [create, setCreate] = useState([]);

  const getAllCreations = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/creation"
      );
      setCreate(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCreations();
  }, []);
  return (
    <div>
      <Navbar />
      <Header />
      <div className="main">
        <div className="container">
          <div className="songs_container">
            <CreateForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
