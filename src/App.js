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
  const [arr, setArr] = useState([])
  const [types, setTypes] = useState([])
  useEffect(() => {
    Fetching().then((data) => setPArray(data))
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
      let arr = [{ type: [], url: '' }]

      pArray.map((el) => {
        FetchingOne(el.url)
          .then((data) => {
            if (data.data.types.length !== 0) {
              arr.push({ type: data.data.types, url: el.url })
            }
          })
          .then(() => {
            arr = arr.filter((el) => el.url !== '')
            const copy = [...pArray]
            for (let i = 0; i < arr.length; i++) {
              for (let k = 0; k < arr.length; k++) {
                if (copy[i].url === arr[k].url) {
                  copy[i].type = arr[k].type
                }
              }
            }
          })
        // .then((data) => console.log(data))
      })
      console.log(arr)
    }
  }, [pArray])
  // console.log(types)
  const handleFуе = (arra) => {
    // console.log(types)
    // setTypes(arra)
    // return arra
  }

  const handleFilter = () => {}

  return (
    <MyContext.Provider value={{ arr, setArr, types, setTypes }}>
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
                  fun={handleFуе}
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
    </MyContext.Provider>
  )
}

export default App
