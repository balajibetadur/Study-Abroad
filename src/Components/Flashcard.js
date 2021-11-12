import React from 'react'
import './Flashcard.css'



function Flashcard({ setCount, num, word , setStart, setEnd }) {


    let handleClick = () => {
        setStart(num)
        setEnd(num)
        setCount(0)
    }

    return (
        <div onClick = {() => {handleClick()}} className="flash-card">
          

            <div className="card-number">
                {num}
            </div>
            <div className="word">
               <p>{word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)}</p>
            </div>
        </div>
    )
}

export default Flashcard
