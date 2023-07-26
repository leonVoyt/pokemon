import React, { useEffect, useState } from 'react'
import './styles/App.css'
import { Fetching, FetchingOne, FetchingOneType } from './API/PostService'
import image from './assets/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png'
import PokemonCard from './components/PokemonCard'
import PokemoInfo from './components/PokemoInfo'
const App = () => {
  const [pArray, setPArray] = useState([])
  const [curr, setCurr] = useState({})
  const [visible, setVisible] = useState(false)
  const [types, setTypes] = useState([])
  useEffect(() => {
    Fetching()
      .then((data) => {
        const arr = []

        data.map((pokemon) => {
          FetchingOne(pokemon.url).then((data) => {
            arr.push(data.data.types)
          })
        })
        setTypes(arr)
      })
      .then(() => Fetching().then((data) => setPArray(data)))
  }, [])
  const handleFilter = () => {
    // setPArray(pArray.filter((type) => console.log(type)))
    // console.log(types.map((el) => console.log(el)))
  }
  // .map((type) => ))
  // console.log(types)

  return (
    <div className="container">
      <div className="container__logo">
        <div className="container__logo-logo">
          <h1>Pokedex</h1>
        </div>
        <button onClick={() => handleFilter()}>Filter</button>
      </div>

      <div className="container__content">
        <div className="container_left">
          <div className="container_card-list">
            {pArray.map((pokemon, index) => (
              <PokemonCard
                item={pokemon}
                key={index}
                set={setCurr}
                type={types[index]}
              />
            ))}
          </div>
          <div className="container_left--button">
            <button
              onClick={() => {
                setVisible(!visible)
                setCurr({})
              }}
            >
              Load More
            </button>
            <button>Load More Pokemon</button>
          </div>
        </div>
        <div className="container_card-info">
          {visible ? (
            <PokemoInfo item={curr} />
          ) : (
            'Click load more for fatch pokemon detail`s'
          )}
        </div>
      </div>
    </div>
  )
}

export default App
