import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
//import SearchForm from "../components/SearchForm"
import HeroSection from "../components/HeroSection";
import Container from '../components/Container'
import DestinationCard from '../components/DestinationCard'
import styles from './Home.module.css'
import { Compass, Parasol, BuildingComplex, Landmark, MountainSnow, Trees, ArrowRight } from 'lucide-react';

// Redux: useSelector and useDispatch 
import { useSelector, useDispatch } from 'react-redux'; 
// fetchDestinationList = gets destinations from the API
// selectAllDestinations = gets destinations from Redux state
import { selectAllDestinations, fetchDestinationList } from '../slices/destinationSlice';

function Home() {

  // useDispatch lets us send actions to Redux
  const dispatch = useDispatch();

  // Get all destinations from the Redux selector state
  const destinations = useSelector(selectAllDestinations);
  console.log("Destinations:", destinations);


  // Get destinations from API with the dispatch function
  useEffect(() => {
    dispatch(fetchDestinationList());
  }, [dispatch]);

  //state for category selection
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDestinations =
  selectedCategory === "all"
    ? destinations
    : destinations.filter(
        (destination) =>
          destination.category?.toLowerCase() === selectedCategory
      );

  //sort by most visited and only show the top 8, using the sort array. 
  const topDestinations = [...filteredDestinations] .sort((a, b) => b.visitCount - a.visitCount) .slice(0, 8);
        
  const getPillClass = (category) =>
    `${styles.pill} ${
      selectedCategory === category 
        ? styles.active 
        : ""
  }`;

  return (
    <>
    {/*
      <div className={styles.bgImage}>
        <div className={styles.hero}>
          <h2>Discover places worth wandering to.</h2>
          <div>
            <SearchForm destinationList={destinations} />
          </div>
        </div>
      </div>
    */}
      <HeroSection 
        title="Find your next place to wander."
        subtitle="Search destinations, save your favourite places and keep all your travel notes in one place."
        bgImage="https://images.unsplash.com/photo-1684325492820-63eae5bb6dd3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      /> 

      <section>
        <div className={styles.heading_link}>
          <h3>Popular Categories</h3>
          <Link to="/destinations" className={styles.link}>View All <ArrowRight/></Link>
        </div>

        <div className={styles.categories}>
          <button onClick={() => setSelectedCategory("all")} className={getPillClass("all")}>
            <Compass />
            All Destination
          </button>

          <button 
            onClick={() => setSelectedCategory("beach")} className={getPillClass("beach")}
          >
            <Parasol />
            Beach
          </button>

          <button onClick={() => setSelectedCategory("culture")} className={getPillClass("culture")}>
            <Landmark />
            Culture
          </button>

          <button onClick={() => setSelectedCategory("adventure")} className={getPillClass("adventure")}>
            <MountainSnow />
            Adventure
          </button>

          <button onClick={() => setSelectedCategory("city")} className={getPillClass("city")}>
            <BuildingComplex />
            City
          </button>

          <button onClick={() => setSelectedCategory("nature")} className={getPillClass("nature")}>
            <Trees />
            Nature
          </button>
        </div>

      </section>

      <section>
        <div>
          <h3>Top destinations</h3>
          <p>Discover some of the world’s most-loved places and find inspiration for your next adventure.</p>
        </div>
        <Container>
          {
            topDestinations.map((d)=>(
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

export default Home
