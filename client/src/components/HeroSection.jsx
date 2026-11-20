import styles from './HeroSection.module.css';
import SearchForm from './SearchForm';


function HeroSection({ title, subtitle, bgImage }) {

  return (
    <>
      <div 
        className={styles.bg}
        style={{backgroundImage: `url(${bgImage})`}}
      >
        <div className={styles.content}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div>
            <SearchForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;