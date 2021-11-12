import React, { useEffect, useState } from 'react'
import './MultiWords.css'
import MultiWord from './MultiWord'
import db from '../firebase'


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}



const images = importAll(require.context('../../public/images', false, /\.(png|jpe?g|svg)$/));


function MultiWords({ starredWords, setGrid, shortListed, getMeaning, setStarred, setSearched, searched }) {

    let keyPress = (e) => {
        if (e.key === 'Escape') {
            setStarred(false)
            setSearched(false)
            setGrid(false)
        }
    }

  
    useEffect(() => {

        document.addEventListener('keydown', keyPress)
        return () => document.removeEventListener("keydown", keyPress);
    });

    let [focusWord, setFocusWord] = useState(shortListed[0])
    
    let [synAdded, setSynAdded] = useState('word-added hidden')
    
    let [meaning, setMeaning] = useState('Meaning of hovered synonym will appear here')
    let res;
    async function synonymHandler(synonym, addWord) {
        try {
            let res = await getMeaning(synonym.split(' ').join('-'))
            setMeaning(res[0].meanings[0].definitions[0].definition)

            if (addWord) {

                let wordInfo = {}
                wordInfo['Word'] = synonym
                try {
                    wordInfo['Meaning'] = res[0].meanings[0].definitions[0].definition
                } catch (error) {
                    console.log('error', error)
                    wordInfo['Meaning'] = 'Meaning Not Available'
                }
                try {
                    wordInfo['Example'] = res[0].meanings[0].definitions[0].example
                } catch (error) {
                    console.log('error', error)
                    wordInfo['Example'] = 'Example Not Available'
                }
                try {
                    wordInfo['Synonyms'] = res[0].meanings[0].definitions[0].synonyms
                } catch (error) {
                    console.log('error', error)
                    wordInfo['Synonyms'] = ['Synonyms Not Available']
                }


                wordInfo['starred'] = false

                console.log('wordinfo', wordInfo)
                db.collection('search').add({
                    Word: wordInfo['Word'],
                    Meaning: wordInfo['Meaning'],
                    Example: wordInfo['Example'],
                    Synonyms: wordInfo['Synonyms'],
                    starred: wordInfo['starred'],
                    id: 1,
                    group: 1
                })
                setSynAdded('word-added')
                setTimeout(function () {
                    setSynAdded('word-added hidden')
                }, 3000);
            }

        } catch (error) {
            setMeaning('No Meaning Available')
        }

    }

    return (
        <>
        {focusWord ? 
        <div className = 'background'>

                <div className="focus">

                <div className="star-question">
                    <h2 className = 'Word'>{focusWord.data.Word.toUpperCase()}</h2>
                    <div className="image">
                        {images[focusWord.data.Word.toLocaleLowerCase() + '-B.jpg'] && <img src={images[focusWord.data.Word.toLocaleLowerCase() + '-B.jpg'].default} alt={focusWord.data.Word} />}
                
                    </div>
                </div>
                <div className="star-answer">
                    <p className="tag">Meaning</p>
                    <p className = 'answers'> {focusWord.data.Meaning}</p>
                    <p className="tag">Example</p>
                    <p className = 'answers'>{focusWord.data.Example}</p>
                </div>
                <div className="syns">
                    <div className="tag-syn">Synonyms</div>
                    <div className="all-syns">
                        
                        {focusWord.data.Synonyms.map(synonym => <span onMouseEnter = {() => synonymHandler(synonym, false)} className = 'synonym'>{synonym}</span>)}
                    
                    </div>

                    <div className="syn-meaning">
                        Meaning : {meaning}
                    </div>
                </div>
            </div>
           
            
            <div className="all">
                
                {shortListed.map((word, idx) => <MultiWord starredWords = {starredWords} idx = {idx} searched = {searched} setFocusWord = {setFocusWord} word = {word} />)}

            </div>
        </div> : <div className="message">No Starred Words Yet</div> }
        </>
    )
}

export default MultiWords
