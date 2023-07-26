import axios from 'axios'

export const Fetching = async () => {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon/?limit=12'
  )

  return response.data.results
}
export const FetchingOne = async (url) => {
  const response = await axios.get(url)
  //   console.log(response.data)

  return response
}
export const FetchingOneType = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type/10/')

  return response
}
