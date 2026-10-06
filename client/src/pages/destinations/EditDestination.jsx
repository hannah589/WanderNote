import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { updateDestination, selectSingleDestination } from '../../slices/destinationSlice';
// Bring in validation functions
import { alpha, is_Empty } from '../../utils/validation';
import Button from '../../components/Button'

function EditDestination() {
  //get the id from the URL
  let { id } = useParams();
  id = Number(id);
  // Log out the id
  console.log(id)

  //use useNavigate
  const navigate = useNavigate();

  // use the dispatch
  const dispatch = useDispatch();

  // Get single destination from Redux
  const destination = useSelector((state) => selectSingleDestination(state, id));
  console.log('Destination:', destination);

  // Create states for form and set the initial data from the db
  const [formData, setFormData] = useState({
    city: destination.city,
    country: destination.country,
    continent: destination.continent,
    category: destination.category,
    description: destination.description,
    image: destination.image,
    tourismUrls: destination.tourismUrls,
    errors: {}
  });

  // Track the request status
  const [requestState, setRequestState] = useState('idle');

  //check if we have a destination
  if(!destination){
    return (
      <section className='text-danger'>
        <h2>No destination found!</h2>
      </section>
    )
  }

  // Destructure the form data.
  const { city, country, continent, category, description, image, tourismUrls, errors } = formData;

  //track change from form fields
  const onChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value}
    );
  }

  const canSave = country !== '' && requestState === 'idle';
  
  const handleSubmit = e => {
    e.preventDefault();
    // Check that the function is called
    console.log('HandleSubmit - EditDestination.jsx - Running');

    //validations
    if(is_Empty(country)){
      console.log('Name field empty');
      setFormData({...formData, errors: { country: 'You must enter the name of the country...'} });
      return;
    } else {
      setFormData({...formData, errors: { country: 'You must enter a country'} });
    }

    if(alpha(country)){
      console.log('Country contains special characters');
      setFormData({...formData, errors: {country: 'Cannot include any special characters. Alpha characters only. '}});
      return;
    } else {
      setFormData({...formData, errors: { country: ''} });
    }
    
    // Create a newDestination object. 
    //It replace the current object in the db, to update.
    const updDestination = {
      //destId from redux: id from the url
      destId: id, 
      city,
      country, 
      continent, 
      category,
      description, 
      image,
      mUrls: tourismUrls ? [tourismUrls] : []
    }
    // Log out our new destination
    console.log(updDestination);
    
    //send updDestination to redux state/API.
    try {
      if(canSave){
        console.log('Can update.... Updating...');
        setRequestState('pending')
        dispatch(updateDestination(updDestination)).unwrap();
      } else {
        console.log('Cannot update....');
        return;
      }
    } catch (err) {
      console.log('Failed to update destination', err);
      
    } finally{
      setRequestState('idle');
    }
    // After process edit, navigate back to the destination page 
    navigate(`/destinations/${id}`);
  }

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="heading">
            <h1>Edit Destination</h1>
          </div>
        
          <form onSubmit={handleSubmit}>
            <div style="twoCol_Input_group">
              <div className="input-group">
              <label for="city">City</label>
              <input 
                type="city" 
                id="city"
                placeholder='city'
                name='city'
                required 
                value={city}
                onChange={onChange}
                className={`form-control ${errors.city ? "is-invalid" : "is-valid"}`}
              />
              {errors.city && 
                <div className='invalid-feedback'>
                  {errors.city} 
                </div>
              }
            </div>

            <div className="input-group">
              <label for="country">Country</label>
              <input 
                type="country" 
                id="country"
                placeholder='country'
                name='country'
                required 
                value={country}
                onChange={onChange}
                className={`form-control ${errors.country ? "is-invalid" : "is-valid"}`}
              />
              {errors.country && 
                <div className='invalid-feedback'>
                  {errors.country} 
                </div>
              }
            </div>
          </div>

          <div style="twoCol_Input_group">
            <div className="input-group">
              <label htmlFor="continent">Continent:</label>
              <select  
                id="continent"
                name="continent"
                value={continent}
                onChange={onChange}
              >
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
                name="category" 
                value={category}
                onChange={onChange}
              >
                <option value="Beach">Beach</option>
                <option value="Culture">Culture</option>
                <option value="Adventure">Adventure</option>
                <option value="City">City</option>
                <option value="Nature">Nature</option>
              </select>
            </div>
          </div>
            
          <div className="input-group">
            <label htmlFor="image">Image:</label>
            <input
              className={`htmlForm-control ${errors.image ? "is-invalid" : ""}`}
              type="text"
              id="image"
              placeholder="Paste image URL here"
              name="image"
              value={image}
              onChange={onChange}
            />
              {errors.image && (
                <div className="invalid-feedback fs-3 d-block">
                  {errors.image}
                </div>
              )}
          </div>

          <div className="input-group">
            <label htmlFor="country">Description:</label>
            <textarea 
              rows="4"
              id="description"
              placeholder='Type description here...'
              name='description'
              required 
              value={description}
              onChange={onChange}
              className={`htmlForm-control ${errors.description ? "is-invalid" : "is-valid"}`}
            />
            {errors.country && 
              <div className='invalid-feedback'>
                {errors.description} 
              </div>
            }
          </div>


            <div className="input-group">
            <label htmlFor="tourism_urls">Tourism URLs:</label>
            <textarea
              rows="2"
              id="tourism_url"
              placeholder="Tourism URL"
              name="tourismUrls"
              value={tourismUrls}
              onChange={onChange}
            />
            </div>

            <Button 
              className="login-btn" 
              type="submit"
              value='Edit Destination'
            >
              Edit Destination
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditDestination
