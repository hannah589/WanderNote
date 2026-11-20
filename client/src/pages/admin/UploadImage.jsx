import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchImageList} from '../../slices/adminSlice';
import Button from "../../components/Button";
import styles from "./UploadImage.module.css";

function UploadImage(){
  //fetchImageList from Admin Context
  // set state fpr selected image and for message.
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  function handleFileChange(e){
    // Get the first file in the array
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setMessage('');
  }

  const handleUpload = async (e) => {
    // prevent default.
    e.preventDefault();
    console.log('handleUpload - UploadImage.jsx');

    // Set up formData.
    const formData = new FormData();
    // Add in the name of a file
    // Append takes in a string and a blob.
    formData.append('name', selectedFile.name);
    formData.append('file', selectedFile);
    // log out variables
    console.log(formData);
    console.log(selectedFile.name)
    console.log(selectedFile);
    // set up the base url
    const url = 'http://localhost:3001/api/admin/uploadImage';

    try {
      // multer requires content of multipart/form-data
      // set up request
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message || 'Image uploaded successfully');
      dispatch(fetchImageList());
    } catch (err) {
      setMessage('Upload image failed');
      console.log('Error uploading', err.message);
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
                onChange={e => handleFileChange(e)}
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