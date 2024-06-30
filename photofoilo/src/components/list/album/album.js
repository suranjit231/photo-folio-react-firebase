import React from "react";
import styles from "./album.module.css";

export default function Album({ album, handleAlbumClick }) {
  return (
    <div className={styles.albumBox} onClick={() => handleAlbumClick(album)}>
      <div className={styles.albumBody}>
        <img src="./albumIcon.png" alt="Album Icon" />
      </div>
      <div className={styles.albumTitle}>{album.title}</div>
    </div>
  );
}
