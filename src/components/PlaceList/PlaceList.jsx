import React from 'react';
import {useState,useEffect ,createRef} from 'react';
import './PlaceList.css'; 
import PlaceCard from '../PlaceCard/PlaceCard';



function PlaceList({places,childClicked,isLoading ,type,setType,rating ,setRating}){

    
    const [elRefs, setElRefs] = useState([]);
    
   
    // useEffect(() => {
    //     const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
    //     setElRefs(refs);
    // } , [places]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
      }, [places]);

      useEffect(() => {
        if (childClicked !== null && elRefs[childClicked] && elRefs[childClicked].current) {
          elRefs[childClicked].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, [childClicked, elRefs]);  
    
    
    return(
        <div className='flex w-[100%] flex-col items-center flex-wrap justify-center gap-3 '>
            <h2 className='merriweather-regular text-2xl text-wrap lg:text-3xl p-2 text-center'>Restaurants,Hotels and Attraction around you</h2>
            {isLoading?(
                <div className='loader'></div>
            ): (
                <>
                     <div className='flex gap-3 justify-center items-center'>
                <select className='p-2 shadow-md'
                 value={type}
                 name='type'
                 onChange={(e) => setType(e.target.value)}>
                    <option value='restaurants'>Restaurants</option>
                    <option value='hotels'>Hotels</option>
                    <option value='attractions'>Attractions</option>
                </select>
                <select className='p-2 shadow-md' 
                value={rating} 
                name='rating'
                onChange={(e) => setRating(e.target.value)}>
                    <option value={0}>All</option>
                    <option value={3}>Above 3.0</option>
                    <option value={4}>Above 4.0</option>
                    <option value={4.5}>Above 4.5</option>
                </select>
                {/* this div is for list of places fetched by api */}
                </div>

                <div className='flex flex-col w-[100%] p-2 gap-3 max-h-[calc(100vh - 200px)] ; 
                overflow-y:auto items-center justify-center'>
                    {places?.map((place,index) => (
                        <div key={index}  className='flex justify-center items-center w-[90%]  shadow-md mx-auto'>
                            <PlaceCard place={place}
                            selected={Number(childClicked)===index}
                            refProp={elRefs[index]}/>
                        </div>
                    ))}
                </div>
                </>
            )}
           
           
        </div>
    )
}


export default PlaceList;