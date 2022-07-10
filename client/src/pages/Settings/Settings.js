import { useEffect, useState } from "react";
import axios from "axios";
import "./settings.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Settings() {
  const { user } = useContext(AuthContext);
  // const { dispatch } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const PF = "http://localhost:8800/api/users/" + user._id;

  useEffect(() => {}, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + "/users/" + user._id,
        updatedUser
      );
      // console.log(res);
      if (res.statusText === "OK") {
        setSuccess(true);
      }
      // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      // dispatch({ type: "UPDATE_FAILURE" });
      setError(err);
    }
  };

  //DELETE User
  function deleteUser() {
    axios
      .delete(process.env.REACT_APP_API_URL + "/users/" + user._id)
      .then(() => {
        alert("User deleted!");
      });
  }

  return (
    <div>
      <Navbar />
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">
              Update user {user.username}
            </span>
            <span className="settingsDeleteTitle" onClick={deleteUser}>
              <div className="card-body">Delete Account </div>
            </span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label className="label-Title">Profile Picture</label>
            <div className="settingsPP">
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                className="settings-Input"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label className="label-Title">Username</label>
            <input
              type="text"
              className="settings-Input"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="label-Title">Email</label>
            <input
              type="email"
              className="settings-Input"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label-Title">Password</label>
            <input
              type="password"
              className="settings-Input"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="settingsSubmit" type="submit">
              Update
            </button>
            {success && (
              <span
                style={{
                  color: "orange",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Profile has been updated...
              </span>
            )}

            {error && (
              <span
                style={{
                  color: "orange",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {error.message}
              </span>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Settings;
