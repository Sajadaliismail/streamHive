import axios from '../axios'

export const fetchBanners = 
    async (request)=>{
        try {
          const response = await axios.get(request);
          console.log(response.data.results);
          if (response.status === 200) {
            return response.data.results;
          } else {
            return null
          }
        } catch (error) {
          console.log(error);
          return null;
        }

    }
        
  ;