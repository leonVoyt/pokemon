import React, { useEffect, useState } from 'react'
import image from '../assets/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png'
import { FetchingOne } from '../API/PostService'

const PokemonCard = ({ item, set, type }) => {
  const [types, setTypes] = useState([])
  useEffect(() => {
    if (item) {
      FetchingOne(item.url).then((data) => setTypes(data.data.types))
    }
  }, [])
  console.log(types)

  return (
    <div className="container_card" onClick={() => set(item)}>
      <img src={image} alt="" />
      <div className="container_card-name">{item && item.name}</div>
      <div className="container_card-type">
        {types &&
          types.map((type) => {
            return type.type.name + ' '
          })}
      </div>
    </div>
  )
}

export default PokemonCard
