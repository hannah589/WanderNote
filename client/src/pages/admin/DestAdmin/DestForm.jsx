
import { useState, useEffect } from 'react';
import { useDestinations } from '../../../context/DestinationsContext';
import { alpha, is_Empty } from '../../../utils/validation';
import Button from '../../../components/Button';

const DEFAULT_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5jPg3QnReJacRIIC0bdEU732tMZ1yYIDuAvospblGw&s=10';

const initialFormData = {
  city: '',
  country: '',
  continent: '',
  category: '',
  description: '',
  image: '',
  tourismUrls: '',
};

function DestForm({ data, isEditing = false, onCancel }) {
  const { AddDestination, updateDestination } = useDestinations();

  const [formData, setFormData] = useState({
    ...initialFormData,
    errors: {},
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditing && data) {
      setFormData({
        city: data.city || '',
        country: data.country || '',
        continent: data.continent || '',
        category: data.category || '',
        description: data.description || '',
        image: data.image || '',
        tourismUrls: Array.isArray(data.tourismUrls)
          ? data.tourismUrls.join(', ')
          : data.tourismUrls || '',
        errors: {},
      });
    }
  }, [data, isEditing]);

  const {
    city,
    country,
    continent,
    category,
    description,
    image,
    tourismUrls,
    errors,
  } = formData;

  // Handle input changes
  function onChange(e) {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: '',
      },
    }));
  }

  // Validate form
  function validateForm() {
    const newErrors = {};

    if (is_Empty(city)) {
      newErrors.city = 'City is required.';
    } else if (alpha(city)) {
      newErrors.city = 'City cannot contain special characters or numbers.';
    }

    if (is_Empty(country)) {
      newErrors.country = 'Country is required.';
    } else if (alpha(country)) {
      newErrors.country = 'Country cannot contain special characters or numbers.';
    }

    if (is_Empty(description)) {
      newErrors.description = 'Description is required.';
    }

    if (is_Empty(continent)) {
      newErrors.continent = 'Please select a continent.';
    }

    if (is_Empty(category)) {
      newErrors.category = 'Please select a category.';
    }

    return newErrors;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFormData(prev => ({
        ...prev,
        errors: validationErrors,
      }));
      return;
    }

    // Prepare tourism URLs
    const urls = tourismUrls
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);

    // Prepare destination data
    const newDestData = {
      city: city.trim(),
      country: country.trim(),
      continent,
      category,
      description: description.trim(),
      image: image.trim() || DEFAULT_IMAGE,
      tourismUrls: urls,
    };

    try {
      if (isEditing) {
        await updateDestination(data.id, newDestData);
        console.log('Destination updated successfully');
      } else {
        await AddDestination(newDestData);
        console.log('Destination added successfully');
      }

      // Reset form after successful submission
      setFormData({
        ...initialFormData,
        errors: {},
      });

    } catch (err) {
      console.error(
        err.response?.data?.message || err.message
      );
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="heading">
          <h2>
            {isEditing ? 'Edit Destination' : 'Add Destination'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formInputs">

            {/* City */}
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Kyoto"
                value={city}
                onChange={onChange}
                className={`form-control ${errors.city ? 'invalid' : 'valid'}`}
              />
              {errors.city && (
                <p className="error-message">{errors.city}</p>
              )}
            </div>

            {/* Country */}
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Japan"
                value={country}
                onChange={onChange}
                className={`form-control ${errors.country ? 'invalid' : 'valid'}`}
              />
              {errors.country && (
                <p className="error-message">{errors.country}</p>
              )}
            </div>

            {/* Description */}
            <div className="input-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe this destination..."
                value={description}
                onChange={onChange}
                className={`form-control ${errors.description ? 'invalid' : 'valid'}`}
              />
              {errors.description && (
                <p className="error-message">{errors.description}</p>
              )}
            </div>

            {/* Image */}
            <div className="input-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={onChange}
                className="form-control"
              />
            </div>

            {/* Continent */}
            <div className="input-group">
              <label htmlFor="continent">Continent</label>
              <select
                id="continent"
                name="continent"
                value={continent}
                onChange={onChange}
                className="form-control"
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

            {/* Category */}
            <div className="input-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={onChange}
                className="form-control"
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

            {/* Tourism URLs */}
            <div className="input-group">
              <label htmlFor="tourismUrls">Tourism URLs</label>
              <input
                type="text"
                id="tourismUrls"
                name="tourismUrls"
                placeholder="https://example.com, https://example2.com"
                value={tourismUrls}
                onChange={onChange}
                className="form-control"
              />
              <small>Separate multiple URLs with commas.</small>
            </div>

          </div>

          <Button type="submit">
            {isEditing ? 'Update Destination' : 'Add Destination'}
          </Button>

          {onCancel && (
            <Button type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}

        </form>
      </div>
    </div>
  );
}

export default DestForm;
