import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import check from "../../check.png";
import "./file.css";

const FileInput = ({ name, label, value, type, handleInputState, ...rest }) => {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const handleUpload = () => {
    setProgressShow(true);
    const fileName = new Date().getTime() + value.name;
    const storageRef = ref(storage, (type = `/creations/${fileName}`));

    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleInputState(name, url);
        });
      }
    );
  };

  return (
    <div className="file-container">
      {type === "image" && value && (
        <img
          src={typeof value === "string" ? value : URL.createObjectURL(value)}
          alt="file"
          className="file-preview-img"
        />
      )}
      <button
        type="file-button"
        onClick={() => inputRef.current.click()}
        className="file-button"
      >
        {label}
      </button>
      <input
        type="file"
        ref={inputRef}
        accept="image/png, image/gif, image/jpeg"
        onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
        vlaue={value}
        className="file-input"
        {...rest}
      />

      {value !== null && !progressShow && typeof value !== "string" && (
        <button onClick={handleUpload} className="button">
          Upload
        </button>
      )}
      {progressShow && progress < 100 && (
        <div className="file-progress-container">
          <p>{progress}%</p>
        </div>
      )}
      {progress === 100 && (
        <div className="file-progress-container">
          <img src={check} alt="check circle" className="file-check-img" />
        </div>
      )}
    </div>
  );
};

export default FileInput;
