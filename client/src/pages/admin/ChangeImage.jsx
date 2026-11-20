// import useState, useSelector, useDispatch
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import selectImageList and fetchImageURL
import { selectImageList, fetchImageURL } from "../../slices/adminSlice";
import Button from "../../components/Button";

function ChangeImage(){
  // set up useSelector and useDispatch.
  const dispatch = useDispatch();
  const imageList = useSelector(selectImageList);

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
    dispatch(fetchImageURL(image));
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