// PhotoCarosel.js
import React, { useState } from "react";
import styles from "./carosel.module.css";

export default function PhotoCarosel({ album, currentIndex, setShowCarosel }) {
  const [currentImage, setCurrentImage] = useState(currentIndex);

  function changeImage(ind) {
    if (ind > 0) {
      let newInd = currentImage === album.photos.length - 1 ? 0 : currentImage + 1;
      setCurrentImage(newInd);
    } else {
      let newInd = currentImage === 0 ? album.photos.length - 1 : currentImage - 1;
      setCurrentImage(newInd);
    }
  }

  // Check if currentImage is within bounds
  if (
    !album.photos ||
    album.photos.length === 0 ||
    currentImage === null ||
    currentImage >= album.photos.length ||
    currentImage < 0
  ) {
    return null; // Render nothing if index is out of bounds
  }

  return (
    <div className={styles.caroselContainer}>
      <img src={album.photos[currentImage].imageUrl} alt={album.photos[currentImage.title]} />

      <i
        onClick={() => changeImage(1)}
        className={`fa-solid fa-circle-arrow-left ${styles.previous}`}
      ></i>

      <i
        onClick={() => changeImage(-1)}
        className={`fa-solid fa-circle-right ${styles.next}`}
      ></i>

      <i
        onClick={() => setShowCarosel(null)}
        className={`fa-regular fa-circle-xmark ${styles.close}`}
      ></i>
    </div>
  );
}
