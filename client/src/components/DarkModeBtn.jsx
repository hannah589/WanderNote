import { useState, useEffect } from 'react'
import { LuSun, LuMoon } from 'react-icons/lu';
import styles from './DarkModeBtn.module.css'

function DarkModeBtn() {

  //Current state light mode is true, if false dark mode 
  const [isLightModeBtn, setIsLightModeBtn] = useState(true);

  //function when click button toggle:
  //flip from light to dark mode, current to previous value of isLightModeBtn button state
  function toggle(){
    setIsLightModeBtn(prev => !prev);
  }

  //Apply theme to document every time isLightmodeBtn changes
  useEffect(() => {
  document.documentElement.dataset.theme = isLightModeBtn
    ? "light"
    : "dark";
  }, [isLightModeBtn]);

  return (
    <>
      <button onClick={toggle} className={styles.light_mode} aria-label="toggle theme">
        {/*If light mode is true, show light mode button, sun icon. If not show dark mode button, moon icon*/}
        {isLightModeBtn 
          ? <> <LuSun className={styles.icon} aria-label="light mode"/> </>
          : <LuMoon className={styles.icon} aria-label="dark mode"/>}
      </button>
      

    </>
  )
}

export default DarkModeBtn