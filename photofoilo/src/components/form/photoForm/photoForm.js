import React, { useState, useEffect } from "react";
import styles from "./photoForm.module.css";

// Component for adding or editing a photo
export default function PhotoForm({ addPhoto, isEditPhotoForm, editPhoto, setEditPhotoForm }) {
  const [formData, setFormData] = useState({ title: "", imageUrl: "" });

  useEffect(() => {
    if (isEditPhotoForm) {
      setFormData({
        title: isEditPhotoForm.title,
        imageUrl: isEditPhotoForm.imageUrl,
      });
    }
  }, [isEditPhotoForm]);

  // Handle form submission for adding or editing a photo
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) return;

    const newPhoto = { ...formData, id: isEditPhotoForm?.id || Date.now().toString() };

    if (isEditPhotoForm) {
      editPhoto(newPhoto);
      setEditPhotoForm(null);
    } else {
      addPhoto(newPhoto);
    }
    clearFormInput();
  }

  // Clear form inputs
  function clearFormInput() {
    setFormData({ title: "", imageUrl: "" });
  }

  return (
    <div className={styles.photoFormContainer}>
      <form className={styles.photoForm} onSubmit={handleFormSubmit}>
        <h2>{isEditPhotoForm ? "Edit Image" : "Add Image"}</h2>

        {/* Photo title input */}
        <div className={styles.formControlDiv}>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title..."
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* Photo image URL input */}
        <div className={styles.formControlDiv}>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            placeholder="Image URL..."
            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </div>

        <div className={styles.buttonDiv}>
          <button type="reset" className={styles.clearBtn} onClick={clearFormInput}>
            Clear
          </button>
          <button className={styles.addPhotoBtn}>
            {isEditPhotoForm ? "Edit" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
