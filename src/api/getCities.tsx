import axios from 'axios';

export interface City {
  city: string;
  region: string;
  offices: { office: string }[];
}

const getCities = async () => {
  const { data } = await axios.get<City[]>(
    `https://63ea86464ade1a6f23a941b2.mockapi.io/cities`,
  );
  return data;
};
export default getCities;
