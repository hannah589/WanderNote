import { useEffect } from "react";
import Container from '../components/Container'
import DestinationCard from '../components/DestinationCard'

// Redux: useSelector and useDispatch 
import { useSelector, useDispatch } from 'react-redux'; 
// fetchDestinationList = gets destinations from the API
// selectAllDestinations = gets destinations from Redux state
import { selectAllDestinations, fetchDestinationList } from '../slices/destinationSlice';

function Destinations() {

  // useDispatch lets us send actions to Redux
  const dispatch = useDispatch();

  // Get all destinations from the Redux selector state
  const destinations = useSelector(selectAllDestinations);

  // Get destinations from API with the dispatch function
  useEffect(() => {
    dispatch(fetchDestinationList());
  }, []);
  
  //number of destinations
  const results = destinations.length;

  return (
    <>
      <section className="hero-section">
        <h2>Explore destinations across the world</h2>
        <p>Discover vibrant cities, cultural capitals, peaceful sanctuaries, and breathtaking natural wonders across all seven continents</p>
      </section>

      <section>
        <p>{`Results (${results})`}</p>
        <Container>
          {
            destinations.map((d)=>(
              <DestinationCard
                key={d.id}
                id={d.id}
                image={d.image}
                continent={d.continent}
                city={d.city}
                country={d.country}
              />
            ))
          }
        </Container>
      </section>
    </>
  )
}

export default Destinations
