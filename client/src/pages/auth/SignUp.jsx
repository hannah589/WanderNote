import { Fragment, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { register } from '../../slices/authSlice';
import { is_Empty } from '../../utils/validation';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    password: '',
    passwordCompare: '',
    errors: {}
  });

  const [registerStatus, setRegisterStatus] = useState('idle');

  const {
    firstName,
    lastName,
    email,
    image,
    password,
    passwordCompare,
    errors
  } = formData;

  // Update form fields
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();

    // Create an object to hold validation errors
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

    if (is_Empty(password)) {
      newErrors.password = 'Password is required';
    }

    if (is_Empty(passwordCompare)) {
      newErrors.passwordCompare = "You haven't retyped your password";
    }

    if (password !== passwordCompare) {
      newErrors.password = 'Passwords do not match';
    }

    // Show validation errors
    if (Object.keys(newErrors).length > 0) {
      setFormData({
        ...formData,
        errors: newErrors
      });
      return;
    }

    // Clear previous errors
    setFormData({
      ...formData,
      errors: {}
    });

    try {
      setRegisterStatus('pending');

      // Wait for registration to finish
      await dispatch(register({
        firstName,
        lastName,
        email,
        image,
        password
      })).unwrap();

      // Only redirect if registration succeeds
      navigate('/');

    } catch (err) {
      console.error('Registration failed:', err);

      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          general: err?.message || 'Registration failed'
        }
      });

    } finally {
      setRegisterStatus('idle');
    }
  };

  return (
    <Fragment>
      <div className="login-container">
        <div className="login-box">

          <div className="heading">
            <h1>Register</h1>
            <p className="subtitle">Create an account</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={onChange}
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={onChange}
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@somewhere.com"
                value={email}
                onChange={onChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="image">Profile Picture</label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="Image URL"
                value={image}
                onChange={onChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="passwordCompare">Re-enter Password</label>
              <input
                type="password"
                id="passwordCompare"
                name="passwordCompare"
                placeholder="Re-enter Password"
                value={passwordCompare}
                onChange={onChange}
                className={`form-control ${errors.passwordCompare ? "is-invalid" : ""}`}
              />
              {errors.passwordCompare && <div className="invalid-feedback">{errors.passwordCompare}</div>}
            </div>

            {errors.general && (
              <div className="invalid-feedback">
                {errors.general}
              </div>
            )}

            <Button
              className="btn"
              type="submit"
              disabled={registerStatus === 'pending'}
            >
              Sign up
            </Button>

            <p className="register">
              Already have an account?
              <Link to="/login">Log In</Link>
            </p>

          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;
