/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Icon } from 'leaflet';
import { useState, useEffect, useCallback } from 'react'
import MarkerCustom from './components/Marker';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddPet from './components/AddPet';
import { TextField } from '@mui/material';
import { debounce } from 'lodash';

function MyComponent({ saveMarkers, coords }) {
  const map2 = useMap();
  map2.setView(coords ?? [51.505, -0.09], 12);
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      saveMarkers([lat, lng]);
    }
  });
  return null;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const catIcon = new Icon({
    iconUrl: 'https://w7.pngwing.com/pngs/186/656/png-transparent-kitten-cat-kitten-mammal-face-cat-like-mammal.png',
    iconSize: [35, 35], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const dogIcon = new Icon({
    iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcfe-277zhKNPLUAip3fvp21X7Lt5ekgFrsA&s',
    iconSize: [35, 35], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const [pets, setPets] = useState([]);
  const [petsSearch, setPetsSearch] = useState([]);
  const [userLocation, setUserLocation] = useState(null)
  const [open, setOpen] = useState(false);
  const [marker, setMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMarker(null);
  };

  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          setUserLocation([latitude, longitude]);
        },
        // if there was an error getting the users location
        (error) => {
          setUserLocation([51.505, -0.09]);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      setUserLocation([51.505, -0.09]);
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetch = async () => {
    const allPets = (await axios('http://localhost:3333/pets')).data
    setPets(allPets.map(p => ({ ...p, id: p._id })))
  };


  const saveMarkers = (newMarkerCoords) => {
    handleOpen()
    setMarker(newMarkerCoords)
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // setPosition({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
    Promise.all([getUserLocation(), fetch()]).then(() => {
      setIsLoading(false)
    });

  }, []);

  const handleAddPet = async (data) => {
    await axios.post('http://localhost:3333/pet', data).then((response) => {
      alert('Pet adicionado com sucesso')
      handleClose();
      fetch();
    })
  }

  const handleRemovePet = async (id) => {
    await axios.delete(`http://localhost:3333/pet/${id}`).then((response) => {
      alert('Pet removido com sucesso')
      fetch();
    })
  }

  const handleEditPet = async (data) => {
    await axios.put(`http://localhost:3333/pet/${data.id}`, data).then((response) => {
      alert('Pet atualizado com sucesso')
      fetch();
    })
  }

  const fetchData = async (query) => {
    await axios.get(`http://localhost:3333/search?name=${query}`).then((response) => {
      if (response.status === 200 && response.data.length) {
        const searchData = response.data.map(p => ({ ...p, id: p._id }));
        alert(`Encontrados ${searchData.length} resultados.`)
        setPetsSearch([...searchData]);
      } else {
        alert('Nenhum resultado encontrado.')
        setPetsSearch([]);
      }
      setIsLoading(false)
    })
  };

  const debouncedFetchData = useCallback(
    debounce(fetchData, 1500),
    []
  );

  const onSearch = ({ target }) => {
    debouncedFetchData(target.value);
  };

  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div style={{
            position: 'absolute', top: 10, left: '40%', background: 'white', borderRadius: '1rem', width: '25rem',
            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', zIndex: 999
          }}>
            <TextField
              id="standard-basic"
              label="Pesquisar"
              variant="standard"
              onChange={onSearch}
            />
          </div>
          <MapContainer
            center={userLocation}
            style={{ width: "100%", height: "100vh", position: 'relative' }}
            scrollWheelZoom={true}
            maxZoom={30}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {(!!petsSearch.length ? petsSearch : pets).map((pet) => (
              <MarkerCustom
                key={pet.id || pet._id}
                icon={pet.type === 'Dog' ? dogIcon : catIcon}
                data={pet}
                id={pet.id || pet._id}
                handleRemovePet={handleRemovePet}
                handleEditPet={handleEditPet}
              />
            ))}
            <MyComponent saveMarkers={saveMarkers} coords={userLocation} />
          </MapContainer>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Adicionar Pet para adoção
              </Typography>
              <AddPet handleSubmit={handleAddPet} marker={marker} onClose={handleClose} />
            </Box>
          </Modal>
        </>
      )}
    </>
  );

}

export default App;
