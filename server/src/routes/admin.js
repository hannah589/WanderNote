// File: src/Routes/admin.js
// This file will hold the routes of our admin dashboard
// it holds the routes for 
// uploadImage
// getImageList
// getImageURL

// Bring in express, fs, multer
const express = require('express');
const fs = require('fs');
const multer = require('multer');

// load in middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Set up the router
const router = express.Router();

// Set up the storage for multer to use
// This tell multer where to upload the file to.
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname = file.originalname);
  }
});

// set up the upload for multer
const upload = multer({storage: storage});

// upload image route
router.post('/uploadImage', upload.single('file'), (req, res) => {
  console.log('/api/admin/uploadImage - POST');
  console.log(req.file);

  res.status(200).send('Image Uploaded');
});

// GetImageURL
// This route will allows to get the URL of any uploaded Image.
router.get('/getImageURL/:filename', (req, res) => {
  console.log('/api/admin/getImageURL - GET');
  const image = req.params.filename;
  console.log(image);
  const url = `http://localhost:3001/uploads/${image}`;
  console.log(url);
  res.status(200).send(url);
});

// getImageList
// This route will read our upload directory
// then return the list of files as an array.
router.get('/getImageList', async(req, res) => {
  console.log('/api/admin/getImageList - GET');
  // define the directory
  const path = './uploads';
  // Try catch
  try {
    // use the readdir function, pass in the path and a callback.
    await fs.readdir(path, (err, files) => {
      if(err) {
        console.log('Error in getting image list');
        console.log(err.message);
      } else {
        console.log('Files: ');
        console.log(files);
        res.status(200).send(files);
      } 
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;