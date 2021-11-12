import React, { useEffect, useState } from 'react'
import './WordCard.css';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Synonym from './Synonym'
import db from '../firebase'
import firebase from 'firebase'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

function capitalize(string) {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
}


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../public/images', false, /\.(png|jpe?g|svg)$/));



function WordCard(props) {


    let [synAdded, setSynAdded] = useState('word-added hidden')
    // let [synAdded, setSynAdded] = useState('word-added')


    let newNum;
    const handleCount = (num) => {
        props.setView('answer-details hidden')
        props.setViewText('Show')
        if (props.count + num < 0) {
            newNum = props.length + props.count - 1;
        } else if (props.count + num >= props.length) {
            newNum = props.length - props.count - 1
        } else {
            newNum = props.count + num
        }
        props.setCount(newNum)
    }

    const handleView = () => {
        if (props.view.includes('hidden')) {
            props.setView('answer-details')
            props.setViewText('Hide')
        } else {
            props.setView('answer-details hidden')
            props.setViewText('Show')

        }
    }

    let [meaning, setMeaning] = useState('')
    let res;
    async function synonymHandler(synonym, addWord) {
        try {
            let res = await props.getMeaning(synonym.split(' ').join('-'))
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


    let starHandler = () => {
        if (props.star === 'star-word') {
            props.setStar('star-word starred')
            db.collection('star').doc('Rdv95VaHV1sS7n8vzGWV').update({
                'stars': firebase.firestore.FieldValue.arrayUnion(doc.Word)
            })

        } else {
            props.setStar('star-word')
            db.collection('star').doc('Rdv95VaHV1sS7n8vzGWV').update({
                'stars': firebase.firestore.FieldValue.arrayRemove(doc.Word)
            })


        }



    }
    let doc = props.doc;

    if (doc === undefined || doc.data === undefined) {
        doc = { Word: '', Meaning: '', Example: '', Synonyms: [], starred: false }
    } else {
        doc = doc.data
    }

    if (props.searchWord) {
        doc = props.searchWord
        props.setView('answer-details')
        props.setViewText('Hide')

    }

    let starClass;
    if (props.starredWords[0] && doc && props.starredWords[0].stars.includes(doc.Word)) {
        starClass = 'star-word starred'
        props.setStar(starClass)
    } else {
        starClass = 'star-word'
        props.setStar(starClass)
    }

    let keyPress = (e) => {
        
        if ((e.key === 'ArrowDown') || (e.key === ' ') || (e.key === 'ArrowUp')) {
            handleView()
        }
        if (e.key === 'ArrowRight') {
            handleCount(1)
        }
        if (e.key === 'ArrowLeft') {
            handleCount(-1)
        }
        if (e.key === 'Shift') {
            starHandler()
        }
    }

    useEffect(() => {

        document.addEventListener('keydown', keyPress)
        return () => document.removeEventListener("keydown", keyPress);
    });
    let perc;
    props.length > 1 ? perc = (((props.count + 1) / props.length) * 100).toString().slice(0, 4) : perc = 0
    props.setProgress(perc)
    return (

        <div className='word-card-container'>
            <div className="group-number">
                <div className="group-section">

                    <p>Group {doc.group}</p>
                </div>
                <div className={synAdded}>
                    Synonym added to database
                </div>
            </div>
            {props.searched ? 
            <div onClick={() => { }} className="word-star">
                <DeleteRoundedIcon className={starClass} />
            </div> :
            <div onClick={() => { starHandler() }} className="word-star">
                <StarRoundedIcon className={starClass} />
            </div>
            }
            
            {props.meaningSwitch ? <p className="question">{capitalize(doc.Meaning)}</p> : <h2 className="question">{doc.Word.toLocaleUpperCase()}</h2>}
            <div className={props.view}>
                <hr className="division-line" />
                <div className="image">
                <div className="word-image">
                    {images[doc.Word.toLocaleLowerCase() + '-B.jpg'] && <img src={images[doc.Word.toLocaleLowerCase() + '-B.jpg'].default} alt={doc.Word} />}
                </div>
                </div>
                <div className="text">
                {props.meaningSwitch ? <p className="answer">{capitalize(doc.Word)}</p> : <p className="answer">{doc.Meaning}</p>}


                <p className="example">{doc.Example}</p>

                <div className="synonyms">
                    {doc.Synonyms && doc.Synonyms.map((synonym, key = (synonym.id)) =>
                        <div onMouseEnter={() => { synonymHandler(synonym, false) }} onClick={() => synonymHandler(synonym, true)} className="word-synonym">
                            <Synonym synonym={synonym} />
                        </div>

                    )}
                </div>
                <div className="synonym-meaning">
                    Meaning : {meaning}
                </div>
                </div>
            </div>
            <div className="nav-buttons">
                <button onClick={() => { handleCount(-1) }} className="nav-left">Previous</button>
                <button onClick={() => { handleView() }} className="nav-middle">{props.viewText}</button>
                <button onClick={() => { handleCount(1) }} className={"nav-right"}>Next</button>
            </div>
        </div>
    )
}

export default WordCard
