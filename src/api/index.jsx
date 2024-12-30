import axios from 'axios';


  

export const getPlacesData = async(type,sw,ne) =>{
    try{
        const response= await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            
          },
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
          }
        });
        const data= await response.data.data;
        console.log(data);
        return data;
        
    }

    catch(error){
        console.log(error);
    }
}