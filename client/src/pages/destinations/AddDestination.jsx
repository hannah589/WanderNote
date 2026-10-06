import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// useDispatch & action
import { useDispatch } from 'react-redux';
import { addNewDestination } from '../../slices/destinationSlice';
// Bring in the custom validation functions
import { alpha, is_Empty, areValidUrls } from '../../utils/validation';

function AddDestination() {

  // Make use of the useNavigate hook
  const navigate = useNavigate();
  // Make use of the useDispatch hook
  const dispatch = useDispatch();

  // Create state for form and set the initial state 
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    continent: '',
    category: '',
    description: '',
    image: '',
    tourismUrls: '',
    errors: {}
  });
  
  // Destructure the form data
  const { city, country, continent, category, description, image, tourismUrls, errors } = formData;

  // Controlled component
  const onChange = e => {
    // The e is for the event object.
    // e.target.name = one of our formData.properties
    // using the target.name to correctly update the state.
    // e.target.value to read the input box for the new value
    // to update the object in state, use the spread operator '...' to get the current state.
    //
    setFormData({
      ...formData, [e.target.name]: e.target.value}
    );
  }

  const handleSubmit = e => {
    // Be default the submit button will refresh the page
    // To stop this we use
    e.preventDefault();
    // This is also helpful for client-side validation.
    // Check that the function is called
    console.log('HandleSubmit - AddDestination.jsx - Running');

    // We can create functions to re-use for validation

    // Create an empty object to store validation errors. 
    const errors = {}; 
    
    // Check required fields. 
    if(is_Empty(city)){
      console.log('City field empty')
      setFormData({...formData, errors: { city: "The city field is required "}})
      return;
    } else {
      //valid input, else remove error msg from input
      setFormData({...formData, errors: { city: ""}})
    }
    
    if(is_Empty(country)){ 
      errors.country = 'This field is required.'; 
    } 

    //check no special characters entered
    if(alpha(city)){
      console.log('City field contains special characters')
      setFormData({...formData, errors: { city: "City cannot contain any special characters "}})
      return;
    } else {
      //valid input, remove error msg from input
      setFormData({...formData, errors: { city: ""}})
    }
    
    // image errors
    // Set up a default image
    let defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5jPg3QnReJacRIIC0bdEU732tMZ1yYIDuAvospblGw&s=10';

    //if no image passed in, set the default image
    if(is_Empty(image)){
      console.log(defaultImage);
      setFormData({...formData, image: defaultImage});
    } else {
      //else set image, as the image passed in
      defaultImage = image;
      console.log(`image: ${defaultImage}`);
    }

    //check if urls are not valid
    if (!areValidUrls(tourismUrls)) {
      console.log("One or more URLs are invalid");
      setFormData({...formData, tourismUrls: { tourismUrls: "URLs must be a valid http/s"}})
      return;
    } else {
      console.log("All URLs are valid");
      //valid input, remove error msg from input
      setFormData({...formData, errors: { tourismUrls: ""}})
    }

    // Create a newDestination object
    const newDestination = {
      city,
      country, 
      description,
      continent,
      category,
      image: defaultImage,
      tourismUrls: tourismUrls ? [tourismUrls] : []
      //if not in an array, send in an array
    }
  
    // Log out our newDestinations
    console.log(newDestination);
    // Then look at sending this newProduct to our state or API.
    dispatch(addNewDestination(newDestination));
    // We can do other things like redirect the user to the home or product page
    navigate('/destinations');
  }

  return (
    <>
      <div className="login-container">
       <div className="login-box">
        <div className="heading">
          <h1>Add a new destination</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label for="city">City</label>
            <input 
              type="city" 
              id="city"
              placeholder='city'
              required
              name='city'
              value={city}
              onChange={onChange}
              className={`form-control ${errors.city ? "invalid" : "valid"}`}
            />
            {errors.city && 
              <div className='error-message'>
                {errors.city} 
              </div>
            }
          </div>

          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input 
              type="text" 
              id="country"
              placeholder='Japan'
              required
              name='country'
              value={country}
              onChange={onChange}
              className={`form-control ${errors.country ? "invalid" : "valid"}`}
            />
            {errors.country && 
              <p className='error-message'>
                {errors.country} 
              </p>
            }
          </div>


          <div className="input-group">
            <label htmlFor="country">Description:</label>
            <input 
              type="text" 
              id="description"
              placeholder='Description'
              required 
              name='description'
              value={description}
              onChange={onChange}
              className={`htmlForm-control ${errors.description ? "invalid" : "valid"}`}
            />
            {errors.description && 
              <p className='error-message'>
                {errors.description} 
              </p>
            }
          </div>

          <div className="input-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              placeholder="https://blocks.astratic.com/img/general-img-landscape.png"
              name="image"
              value={image}
              onChange={onChange}
              className={`htmlForm-control ${errors.image ? "invalid" : "valid"}`}
            />
              {errors.image && (
                <p className="error-message">
                  {errors.image}
                </p>
              )}
            </div>

            <div className="input-group">
            <label htmlFor="tourismUrls">Tourism URLs:</label>
            <input
              type="text"
              id="tourismUrls"
              placeholder="Tourism URL"
              name="tourismUrls"
              value={tourismUrls}
              onChange={onChange}
              className={`htmlForm-control ${errors.image ? "invalid" : "valid"}`}
            />
              {errors.tourismUrls && (
                <p className="error-message">
                  {errors.tourismUrls}
                </p>
              )}
            </div>

            <div className="input-group">
            <label htmlFor="continent">Continent:</label>
            <select  
              id="continent"
              required
              name="continent"
              value={continent}
              onChange={onChange}
            >
              <option value="">Select a continent</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Australia">Australia</option>
              <option value="Antarctica">Antarctica</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="category">Category:</label>
            <select 
              id="category"
              required
              name="category" 
              value={category}
              onChange={onChange}
            >
              <option value="">Select a category</option>
              <option value="Beach">Beach</option>
              <option value="Culture">Culture</option>
              <option value="Adventure">Adventure</option>
              <option value="City">City</option>
              <option value="Nature">Nature</option>
            </select>
          </div>

          <button
            className="login-btn" 
            type="submit"
            value='Add Destination'
          >
            Add Destination
          </button>
        </form>
      </div>
      </div>
  
    </>
  )
}

export default AddDestination
