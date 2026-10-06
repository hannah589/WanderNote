import { MapPin } from 'lucide-react';
import styles from './SearchForm.module.css';

function SearchForm() {
  return (
    <form className={styles.searchForm}>
      <MapPin size={32}/>
      <input
        type="text"
        placeholder="Where to next?"
        aria-label="Search destinations"
      />

      <button type="submit">
        Explore
      </button>
    </form>
  );
}

export default SearchForm;