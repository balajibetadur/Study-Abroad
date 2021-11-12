import React from 'react'
import './PracticeWord.css'

function capitalize(string) {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
}

function PracticeWord({ word }) {
    
    return (
        <div className = 'practice-word'>
           {capitalize(word.Word)}
        </div>
    )
}

export default PracticeWord
