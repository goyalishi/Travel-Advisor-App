import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {useState} from 'react';
import './Header.css';
import { IoMdSearch } from "react-icons/io";


function Header({setCoordinates}){

    const [autocomplete, setAutocomplete] = useState(null);

    const onPlaceChangedHandler = () => {
        const lat=autocomplete.getPlace().geometry.location.lat();
        const lng=autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat,lng});
    }
    
    const onLoadHandler = (autoC) => setAutocomplete(autoC);
    
    return(
        <div className='flex justify-between bg-gradient-to-r from-blue-900 to-blue-400 h-[7vh] w-full mb-3 items-center px-[5%]'>
            <div className='flex items-center gap-2'>
                <img src="../../../public/Travel.png" alt="logo" className='  rounded-[50%] h-[3em] ' />
                <h1 className='pacifico-regular text-white text-3xl hidden sm:block'>Travel Sphere</h1>
            </div>
            <div className='flex gap-2 justify-center items-center'>
                <p className='text-white hidden md:block'>Explore new places</p>
                <Autocomplete onLoad={onLoadHandler} onPlaceChanged={onPlaceChangedHandler}>
                <div className="relative">
                    <input
                      className="bg-white bg-opacity-45 rounded-md p-1 pl-8 outline-none" 
                      placeholder="Search"
                      type="text" 
                    />
                    <IoMdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" /> 
                </div>
                </Autocomplete>
            </div>
            
        </div>
        
            
          )
        }
        
    



export default Header;