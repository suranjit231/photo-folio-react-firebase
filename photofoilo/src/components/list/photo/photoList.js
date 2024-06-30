// PhotoList.js
import React, { useState } from "react";
import styles from "./photoList.module.css";
import Spinner from 'react-spinner-material';
import PhotoForm from "../../form/photoForm/photoForm";
import PhotoCarosel from "../carosel/carosel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PhotoList({ album, handleBack, updateAlbumPhotos }) {
  const [isShowAddForm, setIsShowAddForm] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isEditPhotoForm, setEditPhotoForm] = useState(false);
  const [currentIndex, setShowCarosel] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleImageLoad() {
    setLoading(false);
  }

  function addPhoto(newPhoto) {
    const updatedAlbum = { ...album, photos: [newPhoto, ...album.photos] };
    updateAlbumPhotos(updatedAlbum);
    setShowCarosel(null);
    toast.success("Photo is added successfully!");
  }

  function deletePhoto(id) {
    const updatedPhotos = album.photos.filter(photo => photo.id !== id);
    updateAlbumPhotos({ ...album, photos: updatedPhotos });
    setShowCarosel(null);
    toast.success("Photo is deleted successfully!");
  }

  function editPhoto(updatedPhoto) {
    const updatedPhotos = album.photos.map(photo =>
      photo.id === updatedPhoto.id ? updatedPhoto : photo
    );
    updateAlbumPhotos({ ...album, photos: updatedPhotos });
    toast.success("Photo is updated!");
  }

  return (
    <div className={styles.photoListContainer}>
      {isShowAddForm || isEditPhotoForm ? (
        <PhotoForm
          addPhoto={addPhoto}
          isEditPhotoForm={isEditPhotoForm}
          editPhoto={editPhoto}
          setEditPhotoForm={setEditPhotoForm}
        />
      ) : null}

      <div className={styles.photoListHeaderSec}>
        <div onClick={handleBack} className={styles.backBtn}>
          <img src="./back.png" alt="Back to album" />
        </div>

        <p className={styles.photoHeadPara}>
          {album.photos.length === 0
            ? `No images in ${album.title}`
            : `Images in ${album.title}`}
        </p>

        <button
          className={isEditPhotoForm || isShowAddForm ? styles.clear : styles.addImageBtn}
          onClick={() => {
            if (isEditPhotoForm) {
              setEditPhotoForm(prev => !prev);
              setIsShowAddForm(false);
            } else {
              setIsShowAddForm(prev => !prev);
              setEditPhotoForm(null);
            }
          }}
        >
          {isEditPhotoForm || isShowAddForm ? "Clear" : "Add Image"}
        </button>
      </div>

      {album.photos.length > 0 && (
        <div className={styles.photoListWrapper}>
          {album.photos.map((photo, index) => (
            <div
              className={styles.photoBox}
              key={photo.id}
              onMouseOver={() => setHoverIndex(photo.id)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setShowCarosel(index)}
            >
              <div className={styles.image}>
                {loading && (
                  <div className={styles.spinner}>
                    <Spinner size={40} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
                  </div>
                )}
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  onLoad={handleImageLoad}
                  style={loading ? { display: 'none' } : {}}
                />
              </div>
              <h4>{photo.title}</h4>

              {hoverIndex === photo.id && (
                <div className={styles.hoverControlBox}>
                  <div
                    className={styles.deleteBtn}
                    onClick={(e) => { e.stopPropagation(); deletePhoto(photo.id); }}
                  >
                    <img src="./delete.png" alt="Delete" />
                  </div>

                  <div
                    className={styles.editBtn}
                    onClick={(e) => { e.stopPropagation(); setEditPhotoForm(photo); }}
                  >
                    <img src="./edit.png" alt="Edit" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {currentIndex !== null && (
        <PhotoCarosel
          album={album}
          currentIndex={currentIndex}
          setShowCarosel={setShowCarosel}
        />
      )}
    </div>
  );
}