import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaLocationDot} from "react-icons/fa6";


function Map({setCoordinates, coordinates, setBounds, places ,setChildClicked}) {

    
    const [isMobile, setIsMobile] = useState(false);
    const placeHolderImg='https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnQlMjBwbGFjZWhvZGVyfGVufDB8fDB8fHww';

    
    function changeHandler(e){
            setCoordinates({lat:e.center.lat,lng:e.center.lng})
            setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
    }
    useEffect(() => {

        function resize(){
            if (window.innerWidth <= 600) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
        }
    }
        resize();
        window.addEventListener('resize', resize);
    return () => {
        window.removeEventListener('resize', resize);
    }       
    }, []);


    return(
        <div className='h-[85vh] w-[100%] p-2 relative'>
            <GoogleMapReact
                bootstrapURLKeys={{ key:import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }} 
                onChange={changeHandler}
                onChildClick={(child) => setChildClicked(child)}    
                >
                
        {places?.filter(place => place.latitude && place.longitude).map((place, i) => (
          <div
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            className='flex justify-center items-center absolute z-index-1 hover:z-index-2'
          >
            
            
            {isMobile ? (
              <FaLocationDot color='red' size={17} />
            ) : 
            (
              <div className='flex flex-col items-center bg-white p-1 max-h-[100px] max-w-[100px] roubded-sm hover:scale-[1.04] '>
                <img src={place.photo && place.photo.images
                    ? place.photo.images.large?.url || place.photo.images[0]?.url
                    : placeHolderImg} alt={place.name} className='h-[3rem] w-[3rem] object-contain ' />
                <p className='text-xs text-wrap text-ellipsis text-center'>{place.name}</p>
              </div>
            )}
          </div>  
     ))}
     </GoogleMapReact>
   </div>
 );
}

export default Map;