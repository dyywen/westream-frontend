import Link from 'next/link';
import styles from '../styles/Preview.module.css'

function Preview(props) {

    
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div>
          <Link href='/'>
            <img className={styles.logo} src="WeStreamlogo.png" alt="logo" style={{cursor: 'pointer'}}/>
          </Link>
        </div>
      </div>
      <h1>WELCOME TO MOVIE PREVIEW</h1>
    </div>
  );
}

export default Preview;
