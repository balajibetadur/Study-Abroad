import { ControlCameraOutlined } from '@material-ui/icons';
import React from 'react'
import './Practice.css';
import PracticeWord from './PracticeWord'

function Practice({ setView, setViewText, shortListed, setPracticeWord }) {

    let handleHover = (p, word) => {
        setPracticeWord([p, word])
        setView('answer-details')
        setViewText('Hide')
    }
    return (
        <div className='practice'>
            <div className="practice-sub">

                {shortListed.map((word, key = (word.data.id)) =>
                    <div onMouseEnter = {() => handleHover(true, word)}>
                        <PracticeWord word={word.data} />
                    </div>

                )}
            </div>


        </div>
    )
}

export default Practice
