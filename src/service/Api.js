import axios from 'axios';


export const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/winners/winnerId`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const SaveData = async (winner, date) => {
    const data = { nombre:winner, fecha: date };
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/winners/`,
      data
      );
   
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  

// Luego, para utilizar la función fetchData, llámala de esta manera:
fetchData('').then(data => console.log(data));


