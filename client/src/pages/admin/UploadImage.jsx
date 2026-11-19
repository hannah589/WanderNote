import { useState } from "react";
import axios from "axios";
import { useAdmin } from "../../context/AdminContext";
import Button from "../../components/Button";
import styles from "./UploadImage.module.css";

function UploadImage() {
  //fetchImage list from Admin Context
  const { fetchImageList } = useAdmin();

  //set state for selected image and error/success message
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  function handleFileChange(e) {
    // Get the first file in the array
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setMessage("");
  }

  //handle upload image to server
  async function handleUpload(e) {
    e.preventDefault();
    console.log("handleUpload - UploadImage.jsx");

    // if no file selected, return msg
    if (!selectedFile) {
      setMessage("Please select an image");
      return;
    }

    //set up form data
    const formData = new FormData();
    // Add name of the file
    // Append takes in a string and a blob.
    formData.append("name", selectedFile.name);
    formData.append("file", selectedFile);
    // log out variables
    console.log(formData);
    console.log(selectedFile.name);
    console.log(selectedFile);

    // set up the base url
    const url = "http://localhost:3001/api/admin/uploadImage";

    try {
      // multer requires content of multipart/form-data
      // set up request
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.message || "Image uploaded successfully");

      fetchImageList();
    } catch (err) {
      setMessage("Upload image failed");
      console.log("Error uploading:", err.message);
    }
  }

  return (
    <>
      <div className="headingContainer">
        <h2>Upload Hero Image</h2>
      </div>
      

      <div className={styles.uploadCard}>
        <div className={styles.cardHeader}>Choose image to upload</div>

        <div className={styles.cardBody}>
          <form onSubmit={handleUpload}>
            <div className={styles.formGroup}>
              <label htmlFor="selectedFile">Select image to upload:</label>
              <input
                type="file"
                id="selectedFile"
                accept="image/*"
                onChange={handleFileChange}
              />
              {message && <p className={styles.message}>{message}</p>}
            </div>

            <div className="btnContainer">
              <Button type="submit">
                Upload Image
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadImage;
