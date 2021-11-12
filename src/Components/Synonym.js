import React from 'react'
import './Synonym.css'

function Synonym({synonym}) {
    return (
        <div className = 'synonyms'>
            <span  className="synonym">{synonym}</span>
        </div>
    )
}

export default Synonym
