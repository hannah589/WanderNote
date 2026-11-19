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
      <h2>Change Hero Image</h2>
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

      <div>
        <p>Image selected: {image}</p>
        <Button onClick={changeFile}>Change Image</Button>
      </div>
    </>
  );
};
export default ChangeImage;
