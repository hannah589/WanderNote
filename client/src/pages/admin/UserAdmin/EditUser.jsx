
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from "../../../context/UserContext";
import { is_Empty } from "../../../utils/validation";
import Button from '../../../components/Button';



function EditUser() {
  // Get the id from URL
  const { id: paramId } = useParams();
  const id = Number(paramId);

  // To make use of the useNavigate hook
  const navigate = useNavigate();

  // Get state and update function from Context
  const { userList, updateUser } = useUser();

  // Find the user by id
  const user = userList.find(user => user.id === id);


  // Create state for our form
  const [formData, setFormData] = useState({
    id: user?.id,
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    image: user?.image || '',
    isAdmin: user?.isAdmin,
    errors: {}
  });

  // Destructure form data
  const {
    firstName,
    lastName,
    email,
    image,
    isAdmin,
    errors
  } = formData;

  // Check for a user after populating the form data
  if (!user) {
    return (
      <section className="error">
        <h2>User not found!!!</h2>
      </section>
    );
  }

  // Update form state when an input changes
  function onChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  // Check if we can save
  const canSave = firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '';

  // Handle form submit
  async function handleSubmit(e) {
    // Prevent page refresh
    e.preventDefault();

    console.log('handleSubmit EditUsers.jsx');

    // Clear previous errors
    setFormData(prev => ({
      ...prev,
      errors: {}
    }));

    // Validate form fields
    const newErrors = {};

    if (is_Empty(firstName)) {
      newErrors.firstName = 'First name is required';
    }

    if (is_Empty(lastName)) {
      newErrors.lastName = 'Last name is required';
    }

    if (is_Empty(email)) {
      newErrors.email = 'Email is required';
    }

    // Display validation errors
    if (Object.keys(newErrors).length > 0) {
      setFormData(prev => ({
        ...prev,
        errors: newErrors
      }));
      return;
    }

    // Create updated user object
    const updUser = {
      id: user.id,
      firstName,
      lastName,
      email,
      image,
      isAdmin
    };
    console.log(updUser);

    try {
      if (canSave) {
        console.log("Updating user...");
        await updateUser(updUser);
        // Redirect to user table
        navigate('/users');
      }
    } catch (err) {
      console.log("Failed to update user", err);
    }
  }

  return (
    <>
      <div className="container">
        <div className="heading">
          <h2>Edit User</h2>
        </div>

        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                className={`form-control ${errors.firstName ? "is-invalid" : ''}`}
                id='firstName'
                placeholder='First Name'
                name='firstName'
                value={firstName}
                onChange={onChange}
              />
              {errors.firstName && (
                <div className='invalid-feedback'>
                  {errors.firstName}
                </div>
              )}
            </div>

            <div className='input-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                className={`form-control ${errors.lastName ? "is-invalid" : ''}`}
                id='lastName'
                placeholder='Last Name'
                name='lastName'
                value={lastName}
                onChange={onChange}
              />
              {errors.lastName && (
                <div className='invalid-feedback'>
                  {errors.lastName}
                </div>
              )}
            </div>

            <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className={`form-control ${errors.email ? "is-invalid" : ''}`}
                id='email'
                placeholder='email@somewhere.com'
                name='email'
                value={email}
                onChange={onChange}
              />
              {errors.email && (
                <div className='invalid-feedback'>
                  {errors.email}
                </div>
              )}
            </div>

            <div className='input-group'>
              <label htmlFor='image'>Image</label>
              <input
                type='text'
                className={`form-control ${errors.image ? "is-invalid" : ''}`}
                id='image'
                placeholder='Image'
                name='image'
                value={image}
                onChange={onChange}
              />
              {errors.image && (
                <div className='invalid-feedback'>
                  {errors.image}
                </div>
              )}
            </div>

            <div className='btnContainer'>
              <Button type="submit">
                Edit User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUser;
