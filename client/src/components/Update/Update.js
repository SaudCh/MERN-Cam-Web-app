import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./update.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Update = (_) => {
  const [create, setCreate] = useState([]);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [profile, setProfile] = useState("");
  const [hidden, setHidden] = useState(true);
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

  const refreshPage = async () => {
    window.location.reload(false);
  };

  useEffect(() => {
    getAllCreations();
  }, []);
  useEffect(() => {}, [create]);

  //UPDATE
  function updateCreation() {
    let item = { name, artist };
    console.warn("item", item);
    fetch(process.env.REACT_APP_API_URL + `/creation/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((result) => {
        result.json();
      })
      .then()
      .catch((err) => {});
  }

  //UPDATE PHOTO
  const handleChange = (e) => {
    console.log(e.target.files);
    setProfile(e.target.files[0]);
  };

  const handleApi = () => {
    const formData = new FormData();
    formData.append("profile", profile);
    axios
      .put(process.env.REACT_APP_API_URL + `/creation/${id}`, formData)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faPen}
        size="2x"
        className="update-pen"
        onClick={() => setHidden((s) => !s)}
      />{" "}
      {!hidden ? (
        <div>
          {" "}
          <div className="update-container">
            <div className="update-form">
              <input
                type="text"
                placeholder="New title"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />{" "}
              <input
                type="text"
                placeholder="New description"
                value={artist}
                onChange={(e) => {
                  setArtist(e.target.value);
                }}
              />{" "}
              <button
                onClick={() => {
                  updateCreation();
                  refreshPage();
                }}
              >
                Update{" "}
              </button>
              <div>
                Image update
                <input type="file" onChange={handleChange} />
                <button onClick={handleApi}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Update;
