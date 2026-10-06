import { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from "./DestinationCard.module.css"
import Button from "./Button"
import { Heart, Pencil, Delete, MapPin } from 'lucide-react';
import { useDispatch } from 'react-redux';
// import deleteDestination action from our destinationSlice
import { deleteDestination } from '../slices/destinationSlice';

//Same as Amberle's single product page
function DestinationCard({id, image, city, continent, country }) {

  const dispatch = useDispatch();

  async function onDelete(id){
    // Test that the function is calls
    console.log('onDelete called - DestinationCard.jsx');
    // Check the id, that was passed through
    console.log(`ID clicked: ${id}`);
    // deleteProduct action
    // we need to use .unwrap to throw an error if the delete fails.
    try {
      await dispatch(deleteDestination({id})).unwrap();
    } catch (err) {
      console.log('Failed to delete product', err);
    }  
  }

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
          <p>{continent}</p>
          <div className={styles.cardHeading}>
            <MapPin />
            <h4>{city}, {country}</h4>
          </div>
          
          <Button>Explore destination</Button>
        </div>
      </Link>
      
      <div className={styles.actions}>
        <Link to={`/edit/${id}`}>
          <button><Pencil />Edit</button>
        </Link>
        <button
          type="button"
          className="btn"
          onClick={() => onDelete(id)}
        >
          <Delete />Delete
        </button>
      </div>
    </div>
  )
}

export default DestinationCard
