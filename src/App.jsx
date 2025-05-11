import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='container'>
  <div className='answer'>
    <input type='text' />
  </div>
  <div className='numbers'>
    <button>6</button>
    <button>7</button>
    <button>8</button>
    <button>9</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>0</button>
    <button>1</button>
    <button>+</button>
    <button>*</button>
    <button>-</button>
    <button>/</button>
    <button>C</button>
    <button>=</button>
    <button>%</button>
    <button>x^2</button>
    <button>x^y</button>
    <button>e</button>
  </div>
</div>

    </>
  )
}

export default App
