import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewDestination } from '../../../slices/destinationSlice';
import { alpha, is_Empty } from '../../../utils/validation';
import Button from '../../../components/Button';

function AddDestination() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const {
    city,
    country,
    continent,
    category,
    description,
    image,
    tourismUrls,
    errors
  } = formData;

  // Update form fields
  const onChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: ''
      }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = {};

    // Required field validation
    if (is_Empty(city)) {
      errors.city = 'The city field is required.';
    } else if (alpha(city)) {
      errors.city = 'City cannot contain any special characters.';
    }

    if (is_Empty(country)) {
      errors.country = 'The country field is required.';
    }

    if (is_Empty(description)) {
      errors.description = 'The description field is required.';
    }

    if (is_Empty(continent)) {
      errors.continent = 'Please select a continent.';
    }

    if (is_Empty(category)) {
      errors.category = 'Please select a category.';
    }

    // Stop submission if validation fails
    if (Object.keys(errors).length > 0) {
      setFormData(prev => ({
        ...prev,
        errors
      }));
      return;
    }

    // Default image
    const defaultImage =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5jPg3QnReJacRIIC0bdEU732tMZ1yYIDuAvospblGw&s=10';

    // Create destination object
    const newDestination = {
      city,
      country,
      description,
      continent,
      category,
      image: is_Empty(image) ? defaultImage : image,
      tourismUrls: tourismUrls ? [tourismUrls] : []
    };

    try {
      // Dispatch Redux action
      await dispatch(addNewDestination(newDestination)).unwrap();
      // Redirect after successful addition
      navigate('/destinations');
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  return (
    <div className="container">
      <div className="headingContainer">
          <h3>Add destination</h3>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="formInputs">

            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Kyoto"
                required
                name="city"
                value={city}
                onChange={onChange}
                className={`form-control ${errors.city ? 'invalid' : 'valid'}`}
              />
              {errors.city && (
                <p className="error-message">{errors.city}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Japan"
                required
                name="country"
                value={country}
                onChange={onChange}
                className={`form-control ${errors.country ? 'invalid' : 'valid'}`}
              />
              {errors.country && (
                <p className="error-message">{errors.country}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Description"
                required
                name="description"
                value={description}
                onChange={onChange}
                className={`form-control ${errors.description ? 'invalid' : 'valid'}`}
              />
              {errors.description && (
                <p className="error-message">{errors.description}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                placeholder="Image URL"
                name="image"
                value={image}
                onChange={onChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="continent">Continent</label>
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
              {errors.continent && (
                <p className="error-message">{errors.continent}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="category">Category</label>
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
              {errors.category && (
                <p className="error-message">{errors.category}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="tourismUrls">Tourism URLs</label>
              <input
                type="text"
                id="tourismUrls"
                placeholder="Tourism URL"
                name="tourismUrls"
                value={tourismUrls}
                onChange={onChange}
              />
            </div>

          </div>

          <div className="btnContainer">
            <Button type="submit" value="Add Destination">
              Add Destination
            </Button>
          </div>
      </form>
    </div>
  );
}

export default AddDestination;
