import React, { useContext, useEffect, useState } from 'react'
import image from '../assets/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png'
import { mapColors } from '../utils/colors'
import { FetchingOne } from '../API/PostService'
const PokemonCard = ({ item, set, allType }) => {
  const [img, setImg] = useState('')
  useEffect(() => {
    if (item.url) {
      FetchingOne(item.url).then((data) => {
        setImg(data.data.sprites.front_default)
        // console.log()
      })
    }
  }, [item])

  return (
    <div className="container_card" onClick={() => set(item)}>
      <img src={img} alt="" />
      <div className="container_card-name">{item && item.name}</div>
      <div className="container_card-type">
        {item.type &&
          item.type.map((type, index) => (
            <div
              className="container_card-type--element"
              style={{
                backgroundColor: `rgba(${mapColors.get(type.type.name)})`,
              }}
              key={index}
            >
              {type.type.name}
            </div>
          ))}
      </div>
    </div>
  )
}

export default PokemonCard
