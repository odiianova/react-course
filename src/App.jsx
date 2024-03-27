import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem('SelectedPlaces')) || [];
const storedPlaces = storedIds.map((id) => 
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const selectedPlace = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  //Extra execution sicle which triggered after app component execution cicle
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES, 
        position.coords.latitude, 
        position.coords.longitude
      )
  
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id) {
    setModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    //Another example of sideEffect - bacause this code is not directly related to app code
    //We can not wrap below code in useEffect because it is inside func.
    //We are not alowed use a React hoocs in a nested func. They nust be used in a root lavel code
    //This code execute only when user click on one of this items, not when a react component is reexecuted.
    //NOT every side Effect needs useEffect
    //You basically needs useEffect to prevent infinite loops or if you have code that have to run after app component executed at least once
    // const storedIds = JSON.parse(localStorage.getItem('SelectedPlaces')) || [];
    if(storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        'SelectedPlaces', 
        JSON.stringify([id, ...storedIds]
      ));
    }
  }

  const handleRemovePlace = useCallback(  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalOpen(false);

    // const storedIds = JSON.parse(localStorage.getItem('SelectedPlaces')) || [];
    localStorage.setItem(
      'SelectedPlaces', 
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    )
  }, []);



  return (
    <>
      <Modal open={modalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
