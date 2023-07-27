import React, { useEffect, useState } from 'react'
import './styles/App.css'
import { Fetching, FetchingOne, FetchingOneType } from './API/PostService'
import PokemonCard from './components/PokemonCard'
import PokemoInfo from './components/PokemoInfo'
import { useScroll } from './hooks/useScroll'

const App = () => {
  const [pArray, setPArray] = useState([])
  const [curr, setCurr] = useState({})
  const [visible, setVisible] = useState(false)
  const [arr, setArr] = useState(false)
  const [allTypes, setAllTypes] = useState([])
  const [button, setButton] = useState(false)
  const [allPokemon, setAllPokemon] = useState([])
  useEffect(() => {
    Fetching()
      .then((data) => setPArray(data))
      .then(() => setArr(true))
    FetchingOneType()

    function handleClick() {
      setButton(false)
    }
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
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
              if (array.length === pArray.length + 1) {
                resolve(array.filter((el) => el.url !== ''))
              }
            })
            .catch((error) => {
              reject(error)
            })
        })
      })
      if (pArray.length === 0) {
      }
      p.then((result) => {
        let copy = [...pArray]
        const set = new Set([])
        for (let i = 0; i < result.length; i++) {
          for (let k = 0; k < result.length; k++) {
            if (result[i].url === copy[k].url) {
              copy[k].type = result[i].type
            }
          }
        }
        for (let i = 0; i < result.length; i++) {
          for (let k = 0; k < result[i].type.length; k++) {
            set.add(result[i].type[k].type.name)
          }
        }
        setAllPokemon(copy)
        if (allTypes.length === 0) {
          setAllTypes([...set])
        }
        setPArray(copy)
      }).catch((error) => {
        console.error(error)
      })
    }
  }, [arr])

  const handleFilter = (pokemonType) => {
    let filt = allPokemon.filter((item) => {
      for (let i = 0; i < item.type.length; i++) {
        if (item.type[i].type.name === pokemonType) {
          return true
        }
      }
      return false
    })

    setPArray(filt)
  }
  const scroll = () => {
    window.scrollTo(0, 0)
  }
  return (
    <div className="container">
      <div className="container__logo">
        <div className="container__logo-logo">
          <h1>Pokedex</h1>
        </div>
        <div
          className="container__dropdown--button"
          onClick={(e) => {
            e.stopPropagation()
            setButton(!button)
          }}
        >
          filter
        </div>
        <div className={`container__dropdown ${button ? 'active' : ''}`}>
          {allTypes.length !== 0 &&
            allTypes.map((type, index) => (
              <p
                onClick={async () => {
                  await setPArray(allPokemon)
                  await handleFilter(type)
                }}
                key={index}
              >
                {type}
              </p>
            ))}
          <p onClick={() => setPArray(allPokemon)}>all</p>
        </div>
      </div>

      <div className="container__content">
        <div className="container_left">
          <div className="container_card-list">
            {pArray.map((pokemon, index) => (
              <PokemonCard
                item={pokemon}
                key={index}
                set={setCurr}
                allType={allTypes}
              />
            ))}
          </div>
          <div className="container_left--button">
            <button
              onClick={() => {
                setVisible(!visible)
                setCurr({})
                scroll()
              }}
            >
              Load More
            </button>
          </div>
        </div>
        <div className="container_card-info">
          {visible ? (
            <PokemoInfo item={curr} />
          ) : (
            <p>
              Click <span style={{ color: 'blue' }}>load more </span>
              for fatch pokemon detail`s
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
