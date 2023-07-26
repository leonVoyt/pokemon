import React, { useContext, useEffect, useState } from 'react'
import image from '../assets/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png'
import { FetchingOne } from '../API/PostService'
import { MyContext } from '../context/MyContext'

const PokemonCard = ({ item, set, fun }) => {
  const [types, setTypes] = useState([])
  const { arr, setArr } = useContext(MyContext)

  useEffect(() => {
    if (item) {
      FetchingOne(item.url).then((data) => {
        setTypes(data.data.types)
      })
    }
  }, [])

  //   useEffect(() => {}, [types])
  //   console.log(types)

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
