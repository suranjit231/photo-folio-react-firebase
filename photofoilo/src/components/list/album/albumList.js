import React, { useState } from "react";
import styles from "./albumList.module.css";
import Album from "./album";

export default function AlbumList({ handleAlbumClick, addNewAlbum, albumList }) {
  const [albumName, setAlbumName] = useState({ title: "", photos: [] });

  const [isShowAddForm, setIsShowAddForm] = useState(false);

 //======= add a new album when form submit =====//
  function handleSubmitAlbumForm(e) {
    e.preventDefault();
    if (albumName.title === "") return;
    const newAlbum = { ...albumName, photos: [] };
    addNewAlbum(newAlbum);

    setAlbumName({title:""})
  }



  function toggleForm() {
    setIsShowAddForm(!isShowAddForm);
  }

  return (
    <div className={styles.albumListContainer}>
      {isShowAddForm ? (
        <div className={styles.albumForm}>
          <form onSubmit={handleSubmitAlbumForm}>
            <h3 className={styles.albumFormHead}>Create an album</h3>
            <div className={styles.formControlDiv}>
              <input
                type="text"
                name="albumname"
                value={albumName.title}
                onChange={(e) => setAlbumName({ title: e.target.value })}
                placeholder="Title..."
              />
              <div className={styles.buttonDiv}>
                <button type="reset" className={styles.clearBtn} onClick={() => setAlbumName({ title: "" })}>
                  Clear
                </button>
                <button className={styles.addAlbumBtn}>Create</button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
      <div className={styles.albumListWrapper}>
        <div className={styles.albumListHeader}>
          <h3>Your Albums</h3>
          <button className={styles.albumFormToggleBtn} onClick={toggleForm}>
            {isShowAddForm ? "Clear" : "Create Album"}
          </button>
        </div>
        <div className={styles.albumBoxWrapper}>
          {albumList.map((album, ind) => (
            <Album key={ind} album={album} handleAlbumClick={handleAlbumClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
