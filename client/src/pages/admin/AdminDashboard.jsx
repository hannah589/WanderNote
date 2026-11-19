// Import needed components
// Navigate / Outlet from react-router
import { Navigate, Outlet } from 'react-router';
import styles from './AdminDashboard.module.css';
// useSelect from react-redux
import { useSelector } from 'react-redux';

// Import needed selectors from authSlice
// import { selectUserError } from '../../../slices/userSlice';
import { getIsAdmin, getIsAuth } from '../../slices/authSlice';
// Import DashBoardLinks.jsx
import DashboardLinks from './DashboardLinks';
// Create Users.jsx and open it


const AdminDashboard = () => {

  // use selectors
  const isAdmin = useSelector(getIsAdmin);
  const isAuth = useSelector(getIsAuth);
  // const error = useSelector(selectUserError);

  // Redirect the user if they are not authenticated and not admin
  if (!isAdmin && !isAuth){
    return <Navigate to='/login' />
  }

  // Output a message if we have an error
  // if(error){
  //   return <div className='text-danger'>{error}</div>
  // }

  // Set the return. 
  // one side, the dashboard navigation
  // The other side is the <Outlet /> which will render 
  // the child components.
  return (
    <>
      <h1>Admin Dashboard</h1>

      <div className={styles.adminDashboard}>
      <aside className={styles.sidebar}>
        <DashboardLinks />
      </aside>
      <section className={styles.adminContent}>
        {/* need to use outlets here */}
        <Outlet />
      </section>
    </div>
    </>
    
  )
}

export default AdminDashboard;
