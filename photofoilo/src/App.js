
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import AlbumList from "./components/list/album/albumList";
import PhotoList from "./components/list/photo/photoList";
import db from "./firebaseInit";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumList, setAlbumList] = useState([]);

  //===== initialize album list when app loads ====//
  useEffect(() => {
    onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAlbumList(albums);
    });
  }, []);

  //===== select an album ====//
  function handleAlbumClick(album) {
    setSelectedAlbum(album);
  }

  //===== return from photo to album list ====//
  function handleBackToAlbums() {
    setSelectedAlbum(null);
  }

  //===== delete an album ====//
  function deleteAlbum(id) {
    setAlbumList(albumList.filter((album) => album.id !== id));
  }

  async function addNewAlbum(newAlbum) {
    try {
      const docRef = await addDoc(collection(db, "albums"), newAlbum);
      toast.success("Album created successfully!");
    } catch (error) {
      console.error("Error adding album: ", error);
      toast.error("Failed to create album.");
    }
  }

  //==== update album photos ====//
  async function updateAlbumPhotos(updatedAlbum) {
    try {
      await updateDoc(doc(db, "albums", updatedAlbum.id), updatedAlbum);
      setSelectedAlbum(updatedAlbum);
     // toast.success("Album updated successfully!");
    } catch (error) {
      console.error("Error updating album photos: ", error);
      toast.error("Failed to update album.");
    }
  }

  return (
    <div className="App">
      <Navbar />
      {selectedAlbum ? (
        <PhotoList
          album={selectedAlbum}
          handleBack={handleBackToAlbums}
          updateAlbumPhotos={updateAlbumPhotos}
        />
      ) : (
        <AlbumList
          handleAlbumClick={handleAlbumClick}
          addNewAlbum={addNewAlbum}
          albumList={albumList}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
