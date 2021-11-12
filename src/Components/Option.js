import React from 'react'
import './Option.css';

function Option(props) {
    return (
        <div className = 'option'>
            {props.icon}
            <p className="option-text">{props.text}</p>
        </div>
    )
}

export default Option
