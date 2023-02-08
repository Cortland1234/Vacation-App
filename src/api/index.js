import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'



/*API CALL ^^^^^*/

export const getPlaceData = async (sw, ne) => {
    try {
        const { data: { data }} = await axios.get(URL, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': '',
              'X-RapidAPI-Host': ''
            }
          });

        return data;

    } catch (error) {
        console.log(error);
    }
};
