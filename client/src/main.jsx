import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

// Import Provider for react-redux
import { Provider } from 'react-redux';
// import our store
import { store } from './store/store.js';
// import needed selectors.
import { fetchDestinationList } from './slices/destinationSlice.js';
import { loadUser } from './slices/authSlice.js';
import setAuthToken from './utils/setAuthToken.js';

// Fetch the Products from the api.
store.dispatch(fetchDestinationList());

// Check if there is a token in localStorage
const token = localStorage.getItem('token');
console.log(token);

if (token){
  console.log('Setting token...');
  // Set token in HTTP header for requests
  setAuthToken(token);
  // Get the logged in user and to the auth state
  store.dispatch(loadUser());
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
