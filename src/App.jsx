import { useState ,useEffect} from 'react'
import Header from './components/Header/Header'
import Map from './components/Map/Map'
import PlaceList from './components/PlaceList/PlaceList'
import PlaceCard from './components/PlaceCard/PlaceCard';
import { CssBaseline,Grid2} from '@mui/material';

import {getPlacesData} from './api/index'

import './App.css'

function App() {

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [places,setPlaces] = useState([]);
  const[filteredPlaces,setFilteredPlaces]=useState([]);
  const[childClicked,setChildClicked]=useState(null);

  const [coordinates,setCoordinates] = useState({});
  const [bounds,setBounds] = useState({});

  const[isLoading,setIsLoading]=useState(false);


//useEffect for user's current loctaion at starting 
//navigator is a built-in browser api

useEffect( () =>{
  navigator.geolocation.getCurrentPosition( ({coords:{latitude,longitude}}) =>{
    setCoordinates({lat:latitude,lng:longitude});
  })
} ,[]);

useEffect(() => {
  setIsLoading(true);
  if (bounds.ne && bounds.sw) {
    getPlacesData(type,bounds.sw, bounds.ne)
    .then((data) => {
      setPlaces(data?.filter((place) => place.name && place.num_reviews && place.num_reviews > 0));
      setFilteredPlaces([]); // whenever we again get places data we want to clear the filtered places
      setIsLoading(false);
    });
  }
  
}, [type, bounds]);

useEffect(() => {
  const filteredPlaces = places.filter((place) => place.rating > rating);
  setFilteredPlaces(filteredPlaces);
},[rating]);
  

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid2 container spacing={3} style={{width: '100%'}}>
        <Grid2 item size={{ xs: 12, md: 4 }}
          style={{ height: 'calc(100vh - 7vh)', overflowY: 'auto', }}
        >
          <PlaceList places={filteredPlaces.length?filteredPlaces:places} childClicked={childClicked} isLoading={isLoading}
          type={type} setType={setType}
          rating ={rating}
          setRating={setRating}/>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 8 }}>
          <Map setCoordinates={setCoordinates}  
          coordinates={coordinates}
          setBounds={setBounds} 
          places={filteredPlaces.length?filteredPlaces:places}
          setChildClicked={setChildClicked}
           />
        </Grid2>
      </Grid2>
      
     </> 
   
  );
}

export default App;
