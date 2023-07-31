import React, { useEffect, useState } from 'react'
import image from '../assets/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png'
import { FetchingOne } from '../API/PostService'
import { mapColors } from '../utils/colors'

const PokemoInfo = ({ item }) => {
  const [stats, setStats] = useState([])
  const [pokemon, setPokemon] = useState({})
  const [types, setTypes] = useState([])
  const [img, setImg] = useState('')
  useEffect(() => {
    if (item.url) {
      FetchingOne(item.url).then((data) => {
        setTypes(data.data.types)
        setPokemon(data.data)
        setStats(data.data.stats)
        setImg(data.data.sprites.front_default)
        // console.log()
      })
    }
  }, [item])

  return item.name ? (
    <div className="container_card-info--content">
      <img src={img} alt="" />
      <h1 className="container_card-info--content-name">
        {item.name !== '' ? item.name : 'chose pokemon'}
      </h1>

      <div className="container_card-info--content-stats">
        <div className="container_card-info--content-stats-type">
          {types.length !== 0 && 'Types'}
        </div>
        <div className="container_card-info--content-stats-value">
          {types.map((type, index) => (
            <span
              style={{
                backgroundColor: `rgba(${mapColors.get(type.type.name)})`,
              }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      {stats &&
        stats.map((stat, index) => (
          <div className="container_card-info--content-stats" key={index}>
            <div className="container_card-info--content-stats-type">
              {stat.stat.name}
            </div>
            <div className="container_card-info--content-stats-value">
              {stat.base_stat}
            </div>
          </div>
        ))}
      <div className="container_card-info--content-stats">
        <div className="container_card-info--content-stats-type">
          {pokemon.weight && 'Weight'}
        </div>
        <div className="container_card-info--content-stats-value">
          {pokemon.weight && pokemon.weight}
        </div>
      </div>
      <div className="container_card-info--content-stats">
        <div className="container_card-info--content-stats-type">
          {pokemon.moves && 'Total moves'}
        </div>
        <div className="container_card-info--content-stats-value">
          {pokemon.moves && pokemon.moves.length}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>Now you can chose pokemon</h1>
    </div>
  )
}

export default PokemoInfo
