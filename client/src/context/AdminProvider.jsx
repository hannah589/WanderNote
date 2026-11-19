import { useState } from 'react'
import axios from 'axios';

//import context define in context
import { AdminContext } from "./AdminContext"

const adminURL = 'http://localhost:3001/api/admin';

export function AdminProvider({ children }){

  //store the url of the image used in the home page
  const [homepageImage, setHomepageImage] = useState(() => localStorage.getItem('heroImage') || '') 
  //store image list in an array in the server
  const [imageList, setImageList] = useState([]) 

  //this works
  async function fetchImageList(){
    console.log('Getting image list')
    try {
      const res = await axios.get(`${adminURL}/getImageList`);
      console.log(res.data)
      setImageList(res.data);
      return res.data
    } catch (err) {
      console.error("Error fetching images:", err);
      return err.message
    }
  };

  async function fetchImageURL(imageName){
    console.log('fetching image url:', imageName)
    try {
      const res = await axios.get(`${adminURL}/getImageURL/${imageName}`);
      console.log(res.data)
      setHomepageImage(res.data);
      localStorage.setItem('heroImage', res.data)
      return res.data
    } catch (err) {
      return err.message
    }
  };

  function setImage(){
    const savedImage = localStorage.getItem('heroImage')
    setHomepageImage(savedImage || "")
  };
 
  return(
    <AdminContext.Provider value={{
      homepageImage,
      imageList,
      fetchImageList,
      fetchImageURL, 
      setImage
    }}>
      {children}
    </AdminContext.Provider> 
  )
}
