import React from 'react';
import { FaLocationDot,FaPhone } from "react-icons/fa6";
import Rating from '@mui/lab/Rating';


function PlaceCard({place,selected,refProp}){
    // console.log(place);

    const imageUrl = place.photo && place.photo.images
    ? place.photo.images.large?.url || place.photo.images[0]?.url
    : 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnQlMjBwbGFjZWhvZGVyfGVufDB8fDB8fHww';
    
    
    if(selected) refProp?.current?.scrollIntoView({behavior:'smooth',block:'start'});
    return(
        <div className='flex flex-col rounded-md shadow-md p-1 px-2 justify-center
        items-start gap-3'>
            <img src={imageUrl} alt={place.name} className='h-[350px] max-w-[100%] object-fill mx-auto'/>
            <h2 className='text-2xl text-center text-wrap font-bold mx-auto'>{place.name}</h2>
            {place.rating?
            <div className='flex justify-between items-center gap-3 flex-wrap mx-auto'>
                <Rating name="read-only" value={Number(place.rating)} readOnly />
                <p className='text-gray-500'>{place.num_reviews?`Out of${place.num_reviews} reveiws`:''} reviews</p>
            </div>:''}
            <div className='flex flex-wrap gap-2 justify-center items-center'>
            {place?.cuisine?.map(({name}) =>{
                return(
                    <span key={name} className='bg-blue-300 text-blue-900 p-1 rounded-[15px] text-sm'>{name}</span>
                    
                )
            })}
            </div>

            {place?.address && (
                <div className='flex px-2 justify-between items-center gap-3'>
                   <FaLocationDot color='gray' size={20}/> 
                   <p className='text-wrap text-gray-500'>{place.address}</p>
                </div>
               ) }

            {place?.phone && (
                <div className='flex px-2 justify-between items-center gap-3'>
                   <FaPhone color='gray'/> 
                   <p className='text-wrap text-gray-500'>{place.phone}</p>
                </div>
               ) }
               <div className='flex gap-3 justify-center items-center'>
                <button className='text-white bg-blue-900 p-2 rounded-[10px] text-sm hover:bg-blue-800' onClick={() =>{
                    window.open(place.web_url,'_blank');
                }}>Trip Advisor</button>
                <button className=' bg-blue-900 text-white p-2 rounded-[10px] text-sm hover:bg-blue-800' onClick={() =>{
                    window.open(place.website,'_blank');
                }}>website</button>
               </div>

        </div>
    )
}


export default PlaceCard;