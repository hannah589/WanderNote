import { Fragment, useState } from 'react';
import { Link, useNavigate} from "react-router-dom"
// Import useDispatch, register action, import validation
import { useDispatch } from 'react-redux';
import { register } from '../../slices/authSlice';
import { is_Empty } from '../../utils/validation';

function SignUp() {
  //set up use navigate hook
  const navigate = useNavigate()

  // Set up the form state
  const [formData, setFormData ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    password: '',
    passwordCompare: '',
    errors: {}
  });

  // set up state to show the status of saving a new user
  const [ registerStatus, setRegisterStatus ] = useState('idle');

  // set up dispatch
  const dispatch = useDispatch();

  // Destructure the formData
  const { firstName, lastName, email, image, password, passwordCompare, errors } = formData;

    // onChange function
  const onChange = e => setFormData({ 
    ...formData, [e.target.name]: e.target.value
  });

  // setup if we can save or not
  const canSave = (firstName !== '' && email !== '') && registerStatus === 'idle';
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Sign Up/Register.jsx');

    // validation
    // First name
    if (is_Empty(firstName)){
      setFormData({ ...formData, errors: { firstName: 'First Name is required'}});
      return;
    } else{
      setFormData({ ...formData, errors: { firstName: ''}});
    }
    // last name
    if (is_Empty(lastName)){
      setFormData({ ...formData, errors: { lastName: 'Last Name is required'}});
      return;
    } else{
      setFormData({ ...formData, errors: { lastName: ''}});
    }
    // email
    if (is_Empty(email)){
      setFormData({ ...formData, errors: { email: 'Email is required'}});
      return;
    } else{
      setFormData({ ...formData, errors: { email: ''}});
    }
    // password
    if (is_Empty(password)){
      setFormData({ ...formData, errors: { password: 'Password is required'}});
      return;
    } else{
      setFormData({ ...formData, errors: { password: ''}});
    }
    // passwordCompare
    if (is_Empty(passwordCompare)){
      setFormData({ ...formData, errors: { passwordCompare: 'You haven\'t retyped your password'}});
      return;
    } else{
      setFormData({ ...formData, errors: { passwordCompare: ''}});
    }
    // Test that the passwords match
    if(password !== passwordCompare){
      setFormData({ ...formData, errors: { password: 'Passwords do not match'}});
      return;
    } else {
      setFormData({ ...formData, errors: { password: ''}});
    }
    // if we can save the user.
    try {
      if(canSave){
        setRegisterStatus('pending');
        dispatch(register({firstName, lastName, email, image, password})).unwrap();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRegisterStatus('idle');
    }
    // Redirect to homepage
    navigate("/");
  }

  return (
    <Fragment>
        <div>
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
              required 
              placeholder='First Name'
              name='firstName'
              value={firstName} 
              onChange={onChange}
              className={`form-control ${errors.firstName ? "is-invalid" : 'is-valid'}`}
            />
            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="last-name">Last name</label>
            <input 
              type='text'
              className={`form-control ${errors.lastName ? "is-invalid" : 'is-valid'}`}
              id='lastName'
              placeholder='Last Name'
              name='lastName'
              value={lastName} 
              onChange={onChange}
            />
              {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : 'is-valid'}`}
              id='email'
              placeholder='email@somewhere.com'
              name='email'
              value={email} 
              onChange={onChange}
            />
              {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="image">Profile Picture</label>
            <input
                className={`form-control ${errors.image ? "is-invalid" : 'is-valid'}`}
                id='image'
                placeholder='image'
                name='image'
                value={image}
                onChange={onChange}
            />
              {errors.image && <div className='invalid-feedback'>{errors.image}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : 'is-valid'}`}
                id='password'
                placeholder='password'
                name='password'
                value={password}
                onChange={onChange}
            />
              {/* Render error message, if incorrect input*/}
              {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
          </div>

           <div className="input-group">
            <label htmlFor="passwordCompare">Re-enter Password</label>
            <input 
                type="password"
                className={`form-control ${errors.passwordCompare ? "is-invalid" : 'is-valid'}`}
                id='passwordCompare'
                placeholder='passwordCompare'
                name='passwordCompare'
                value={passwordCompare}
                onChange={onChange}
            />
              {/* Error message rendering */}
              {errors.passwordCompare && <div className='invalid-feedback'>{errors.passwordCompare}</div>}
          </div>

          <button className="btn" type="submit">
            Sign up
          </button>

          <p className="register">
            Already have an account?
            <Link to="/login">Log In</Link>
        </p>
        </form>
      </div>
      </div>
    </div>
    </Fragment>
  )
}

export default SignUp
