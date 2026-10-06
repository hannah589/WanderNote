// import useParam to read URL parameters
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ExternalLink, MapPin } from 'lucide-react';
import Map from "../components/Map";
// import redux hooks
import { useSelector, useDispatch } from 'react-redux';
// Import selector and actions/functions from redux Slice
import { selectSingleDestination, getSingleDestination } from '../slices/destinationSlice';
import styles from './DestinationsDetails.module.css'
import Button from "../components/Button";


function DestinationDetails() {
  //2. get id from from the url
  const { id } = useParams();
  console.log("URL id: ", id);

  // Get single destinations from the Redux selector state
  const singleDestination = useSelector((state) =>
    selectSingleDestination(state, id)
  );

  // useDispatch lets us send  actions to Redux and run function
  const dispatch = useDispatch();

  //run when page loads or id changes
  useEffect(() => {
    dispatch(getSingleDestination(id));
  }, [dispatch, id]);

  // Prevent trying to access .id before the API has returned
  if (!singleDestination) {
    return <p>Loading destination...</p>;
  }

  //console.log("Tourism Urls:", singleDestination.tourismUrls);
  //console.log("Is array:", Array.isArray(singleDestination.tourismUrls));
  //JSON.parse() = coverts json string into an array
  const tourismUrls = JSON.parse(singleDestination.tourismUrls);

  return (
    <>
      <section>
        <span>{singleDestination.continent} · {singleDestination.category}</span>
        <div className={styles.heading}>
          <span><MapPin size={56}/></span>
          <h2>{singleDestination.city}, {singleDestination.country}</h2>
        </div>
      </section>

      <section className={styles.destination_content}>
        <div>
          <img 
            src={singleDestination.image}
            alt={singleDestination.country}
          />
        </div>
        <div>
          <h3>Cultural Essence</h3>
          <p className={styles.description}>{singleDestination.description}</p>
          <h3>Travel Resources</h3> 
          <ul className={styles.urlList}>
            {tourismUrls.map((tourismUrls, index) => (
              <>
                <li key={index} className={styles.externalLink}>
                  <a
                    href={tourismUrls}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tourismUrls}
                  </a>
                  <ExternalLink />
                </li>
              </>
            ))}
          </ul>
          <Button>Save a note for your visit</Button>
        </div>
      </section>
      <section className={styles.map}>
        <h3>Locate Your Next Adventure</h3>
        <Map 
          city={singleDestination.city}
          country={singleDestination.country}
        />
      </section>
    </>
  )
}

export default DestinationDetails
