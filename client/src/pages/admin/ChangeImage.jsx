// import useState, useSelector, useDispatch
import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import Button from "../../components/Button";

function ChangeImage(){
  const { imageList, fetchImageURL } = useAdmin();

  // State to store image selected
  const [image, setImage] = useState("");

  // handle change function
  function handleChange(e) {
    setImage(e.target.value);
  }

  // Set up the function to change the image
  function changeFile(e) {
    e.preventDefault();
    console.log("Change File...");
    console.log(image);
    fetchImageURL(image);
  }

  return (
    <>
      <div className="headingContainer">
        <h2>Change Hero Image</h2>
      </div>
      <div className="container">
        <div className="input-group">
          <label htmlFor="fileList">Select Image:</label>
          <select id="fileList" value={image} onChange={handleChange}>
            <option value="">--- Please select and image ---</option>
            {imageList.map((imageName) => (
              <option key={imageName} value={imageName}>
                {imageName}
              </option>
            ))}
          </select>
        </div>
        <p>Image selected: {image}</p>
        <div className="btnContainer">
          <Button onClick={changeFile}>Change Image</Button>
        </div>
      </div>
    </>
  );
};
export default ChangeImage;
