import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from "./DestinationCard.module.css"
import Button from "../components/Button"
import { Heart, Pencil, Trash, MapPin } from 'lucide-react';

//import { useDestinations } from "../context/DestinationsContext";
//import { useAuth } from "../context/AuthContext";


//REDUX
// import deleteDestination action, to delete card
import { deleteDestination } from '../slices/destinationSlice';
import { getIsAdmin,  getIsAuth } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';


//Same as Amberle's single product page
function DestinationCard({id, image, city, continent, country }) {
  const navigate = useNavigate();

  /*
  //CONTEXT
  //2. destructure the delete function value from context
  const { deleteDestination } = useDestinations();
  const { isAuth, isAdmin } = useAuth();

  async function onDelete(id){
    // check that the function is called
    console.log('onDelete called - DestinationCard.jsx');
    // check id was passed through
    console.log(`ID clicked: ${id}`);

    try {
      // Call the API delete function
      await deleteDestination(id);
      console.log('Destination deleted');
      navigate(0); // Reload the previous page
    } catch (error) {
      console.error('Failed to delete destination:', error);
    }
  }
    */

  
  //REDUX
  const dispatch = useDispatch();
  //if user isAdmin, view edit and delete actions
  const isAdmin = useSelector(getIsAdmin);
  //console.log("isAdmin:", isAdmin);
  const isAuth = useSelector(getIsAuth);
  //console.log("isAuth:", isAuth);

  async function onDelete(id){
    // Test that the function is calls
    console.log('onDelete called - DestinationCard.jsx');
    // Check the id, that was passed through
    console.log(`ID clicked: ${id}`);
    // deleteProduct action
    // we need to use .unwrap to throw an error if the delete fails.
    try {
      await dispatch(deleteDestination({id})).unwrap();
      console.log('Destination deleted');
      navigate(0); // Reload the previous page, to see the card gets deleted
    } catch (err) {
      console.log('Failed to delete product', err);
    }  
  }

  //state to change favourite icon 
  const [liked, setLiked] = useState(false);

  function handleFavourite() {
    setLiked(prev => !prev);
  }
  
  return (
    <div className={styles.card}>
      <button 
        className={`${styles.likeButton} ${liked ? styles.active : ""}`}
        onClick={handleFavourite}
      >
        {liked ? <Heart fill="#111" /> : <Heart />}
      </button>

      <Link to={`/destinations/${id}`}>
        <div className={styles.img_box}>
          <img
            src={image}
            alt={country} 
          /> 
        </div>  
        <div className={styles.cardContent}>
          <div>
            <p>{continent}</p>
          <div className={styles.cardHeading}>
            <MapPin size={24}/>
            <h3>{city}, {country}</h3>
          </div>
          </div>
          
          <Button size="lg">Explore destination</Button>
        </div>
      </Link>
      
      {
        (isAdmin && isAuth) &&
        <div className={styles.actions}>
          <Link 
            to={`/admin/dest/edit/${id}`} 
            className={styles.btn}
          >
            <Pencil /> Edit
          </Link>

          <button
            onClick={() => onDelete(id)}
            className={styles.btn}
          >
            <Trash /> Delete
          </button>
        </div>
      }
    </div>
  )
}

export default DestinationCard
