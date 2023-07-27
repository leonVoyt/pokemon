import React, { useContext, useEffect, useState } from 'react'
import image from '../assets/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png'

const PokemonCard = ({ item, set }) => {
  //   console.log(item)

  return (
    <div className="container_card" onClick={() => set(item)}>
      <img src={image} alt="" />
      <div className="container_card-name">{item && item.name}</div>
      <div className="container_card-type">
        {item.type &&
          item.type.map((type) => {
            return type.type.name + ' '
          })}
      </div>
    </div>
  )
}

export default PokemonCard
