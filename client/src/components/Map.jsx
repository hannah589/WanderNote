function Map({ city, country }) {
  //api key stored in .env
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  //pass city and country data from api, to url
  const location = `${city}, ${country}`;
  //check received location: city and country from api
  //console.log("Map location:", location);
  
  return (
    <div className="map-container">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(location)}`}
        title={`Map showing ${location}`}
        loading="lazy"
        allowFullScreen
      />
    </div>
  )
}

export default Map
