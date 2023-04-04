import axios from 'axios';
import { City } from './getCities';

const getOffices = async (city) => {
  const { data } = await axios.get<City[]>(
    `https://63ea86464ade1a6f23a941b2.mockapi.io/cities`,
  );
  const offices = data.find((item) => item.city === city);
  return offices!.offices;
};
export default getOffices;
