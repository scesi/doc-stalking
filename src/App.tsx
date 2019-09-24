import React from 'react'
import logo from './logo.svg'
import './App.css'
import { ListadoDedocentes, numeroDeMaterias, materiasQueDa } from './Services/Service'
import axios from 'axios'

const App: React.FC = () => {
    // console.log(axios.get('http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/134111'))
    console.log(ListadoDedocentes())
    console.log(numeroDeMaterias('BLANCO COCA LETICIA'))
    console.log(materiasQueDa('BLANCO COCA LETICIA'))
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default App
