import { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import api from '../services/api'
import '../styles.css'

const BuscaCep = () => {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  const handleSearch = async () =>{
    

    if(input === ''){
      alert("Preencha algum Cep por favor !")
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

      console.log(response.data)
    } catch (error) {
      alert("Ops erro ao buscar o Cep")
      setInput('')
    }
  }

  return (
    <div className="container">
        <h1 className='title'>Buscador Cep</h1>

        <div className="containerInput">

            <input type="text" 
            placeholder="Digite seu Cep"
            value={input}
            onChange={(e)=>setInput(e.target.value)}/>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>

        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>DDD: {cep.ddd}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}

       
    </div>
  )
}

export default BuscaCep