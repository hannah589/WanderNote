import { Fragment, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import Button from '../../components/Button';
// import useDispatch and login action
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
//import '../login.css'

function Login() {
  //set up use navigate hook
  const navigate = useNavigate()

  // Set up useDispatch
  const dispatch = useDispatch();

  // set up the state for our login form.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {}
  });

  // Destructure the formData
  const { email, password, errors } = formData;

  // onChange function. update the previous state
  function onChange(e){
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  async function handleSubmit(e){
    e.preventDefault();
    console.log('Submit function, login.jsx');
    
    // validation

    // dispatch the login action
    // await to receive jwt 
    try {
      await dispatch(login({ email, password })).unwrap();

      navigate("/");
    } catch (error) {
      console.log("Login failed:", error);
    }
  }

  return (
    <Fragment>
      <div className="login-container">
        <div className="login-box">
          <div className="heading">
            <h1>Login</h1>
            <p className="subtitle">Log in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                placeholder='email'
                name='email'
                required 
                value={email}
                onChange={onChange}
                className={`form-control ${errors.email ? "is-invalid" : "is-valid"}`}
              />
              {errors.email && 
                <div className='invalid-feedback'>
                  {errors.email} 
                </div>
              }
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="Password" 
                placeholder='password'
                name='password'
                required 
                value={password}
                onChange={onChange}
                className={`form-control ${errors.password ? "is-invalid" : "is-valid"}`}
              />
              {errors.password && 
                <div className='invalid-feedback'>
                  {errors.password} 
                </div>
              }
            </div>
            
            <Button className="login-btn" type="submit">
              Log in
            </Button>
          </form>

          <p>
            Don't have an account? 
            <Link 
              className="link" 
              to="/register"> 
                Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
