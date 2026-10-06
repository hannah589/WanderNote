import styles from './HeroSection.module.css';
import SearchForm from './SearchForm';


function HeroSection({ title, bgImage }) {

  return (
    <>
      <div 
        className={styles.bg}
        style={{backgroundImage: `url(${bgImage})`}}
      >
        <div className={styles.content}>
          <h2>{title}</h2>
          <div>
            <SearchForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;