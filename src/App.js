import React, { useEffect, useState } from 'react'
import './styles/App.css'
import { Fetching, FetchingOne, FetchingOneType } from './API/PostService'
import image from './assets/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png'
import PokemonCard from './components/PokemonCard'
import PokemoInfo from './components/PokemoInfo'
import { MyContext } from './context/MyContext'
const App = () => {
  const [pArray, setPArray] = useState([])
  const [curr, setCurr] = useState({})
  const [visible, setVisible] = useState(false)
  const [arr, setArr] = useState(false)
  const [types, setTypes] = useState([])
  useEffect(() => {
    Fetching()
      .then((data) => setPArray(data))
      .then(() => setArr(true))
    // Fetching()
    //   .then((data) => {
    //     let res = []
    //     data.map((el) => {
    //       FetchingOne(el.url)
    //         .then((data) => {
    //           res.push(data.data.types)
    //         })
    //         .then(setTypes(res))
    //     })
    //   })
    //   .then((data) => console.log(data))
  }, [])

  useEffect(() => {
    if (pArray.length !== 0) {
      const p = new Promise((resolve, reject) => {
        let array = [{ type: [], url: '' }]

        pArray.map((el) => {
          FetchingOne(el.url)
            .then((data) => {
              if (data.data.types.length !== 0) {
                array.push({ type: data.data.types, url: el.url })
              }
              // Check if all fetches are done before resolving the promise
              if (array.length === pArray.length + 1) {
                resolve(array.filter((el) => el.url !== ''))
              }
            })
            .catch((error) => {
              reject(error) // Handle the rejection in case of an error
            })
        })
      })

      p.then((result) => {
        let copy = [...pArray]
        for (let i = 0; i < result.length; i++) {
          for (let k = 0; k < result.length; k++) {
            if (result[i].url === copy[k].url) {
              copy[k].type = result[i].type
            }
          }
        }

        setPArray(copy)
      }).catch((error) => {
        console.error(error)
      })
    }
  }, [arr])

  const handleFуе = (arra) => {
    let filt = pArray.filter((item) =>
      item.type.length === 1
        ? item.type[0].type.name === 'poison'
        : item.type[1].type.name === 'poison'
    )
    console.log(filt)
    setPArray(filt)
  }

  const handleFilter = () => {}

  return (
    <div className="container">
      <div className="container__logo">
        <div className="container__logo-logo">
          <h1>Pokedex</h1>
        </div>
        <button onClick={() => handleFуе()}>Filter</button>
      </div>

      <div className="container__content">
        <div className="container_left">
          <div className="container_card-list">
            {pArray.map((pokemon, index) => (
              <PokemonCard item={pokemon} key={index} set={setCurr} />
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
