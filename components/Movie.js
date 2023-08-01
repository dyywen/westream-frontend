import styles from '../styles/Movie.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { Tooltip } from '@material-ui/core';

import Link from 'next/link';


function Movie(props) {

    const [isShown, setIsShown] = useState(false)
    const [show, setShow] = useState(false)
    const [hoverIcon, setHoverIcon] = useState(null)

    // Rating stars
    const stars = [];
    const rating = (props.voteAverage * 5) / 10
    for (let i = 0; i < 5; i++) {
      let style = { 'color': 'white' };
      if (i < rating - 1) {
        style = { 'color': '#f1c40f' };
      }
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
    }

    // Genre Separation
    let genre = props.genres.join(" - ")

    // Upper case titles

    let title = props.title.toUpperCase()

    // Date and overview popover

    function openPopover(icon){
        setShow(true)
        setHoverIcon(icon)
    }

    function closePopover(){
        setShow(false)
        setHoverIcon(null)
    }

    let date = props.date instanceof Date ? props.date.toLocaleDateString("fr") : "Date not available";

    return (
        <div className={styles.card} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} style={{width: "220px", height: "330px"}}>
            <div className={styles.backgroundImage} style={{backgroundImage: 'url(' + props.poster + ')', backgroundSize: "100%", width: "100%", height: "100%", position:'relative'}}>
            {isShown && 
                <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.genre}>{genre}</span>
                </div>
                <div className={styles.play}>
                <Link href="/previewPage">
                    <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: "100px", color: "white", cursor: 'pointer' }} />
                </Link>
                </div>
                <div className={styles.icons}>
                    <Tooltip title={date} enterDelay={300} leaveDelay={100}>
                        <FontAwesomeIcon 
                            aria-owns={show ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={() => openPopover("faCalendar")}
                            onMouseLeave={closePopover}
                            icon={faCalendar} 
                            style={{ color: hoverIcon === "faCalendar" ? "#F4D504" : "white", cursor: 'pointer' }}/>
                    </Tooltip>    
                    <Tooltip title={props.overview} enterDelay={300} leaveDelay={100}>
                        <FontAwesomeIcon 
                            aria-owns={show ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={() => openPopover("faReadme")}
                            onMouseLeave={closePopover}
                            icon={faReadme}
                            style={{ color: hoverIcon === "faReadme" ? "#F4D504" : "white", cursor: 'pointer' }}/>
                    </Tooltip>
                    {/* <Popover
                        id="mouse-over-popover"
                        open={show}
                        anchorEl={popoverAnchor.current}
                        onClose={closePopover}
                        enterDelay={300}
                        leaveDelay={200}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                    >
                        <p className={styles.popoverContent}>{props.overview}</p>
                    </Popover> */}
                </div>
                <span className={styles.stars}>{stars}</span>
            </div>
            }
            </div>
        </div>
    );
}

export default Movie