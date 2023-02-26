import axios from "axios";

const getItem = async (id) => {
  const { data } = await axios.get(`https://63ea86464ade1a6f23a941b2.mockapi.io/items/${id}`)
  return data
}
export default getItem