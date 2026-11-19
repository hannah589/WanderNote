import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import styles from './SearchForm.module.css';

function SearchForm({ destinationList }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /*
  const filteredDestinations = destinationList.filter((destination) =>
    `${destination.city} ${destination.country}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleSearch(e) {
    e.preventDefault();
  }

  function handleDestinationClick(id) {
    navigate(`/destinations/${id}`);
  }

  // put on form 
    onSubmit={handleSearch}
  */
  return (
    
    <form
      className={styles.searchForm}
      
    >
      <MapPin size={32} />

      <input
        type="text"
        placeholder="Where to next?"
        aria-label="Search destinations"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <div className={styles.results}>
          {filteredDestinations.map((destination) => (
            <button
              type="button"
              key={destination.id}
              onClick={() => handleDestinationClick(destination.id)}
            >
              {destination.city}, {destination.country}
            </button>
          ))}
        </div>
      )}

      <button type="submit">
        Explore
      </button>
    </form>
  );
}

export default SearchForm;