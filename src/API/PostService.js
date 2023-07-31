import axios from 'axios'

export const Fetching = async (limit = 12) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
  )

  return response.data.results
}
export const FetchingOne = async (url) => {
  const response = await axios.get(url)
  // console.log(response.)

  return response
}
export const FetchingOneType = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon/4/')
  // console.log(response.data)

  return response
}
