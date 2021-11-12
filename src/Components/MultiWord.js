import React from 'react'
import './MultiWord.css'
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import db from '../firebase'
import firebase from 'firebase'

function MultiWord({ starredWords, word, idx, setFocusWord, searched }) {
    
    let starHandler = () => {
        db.collection('star').doc('Rdv95VaHV1sS7n8vzGWV').update({
            'stars': firebase.firestore.FieldValue.arrayRemove(word.data.Word)
        })
    }

    let deleteHandler = () => {
        db.collection('search').doc(word.id).delete()
    }

    // let showStar = 'star';
    // starredWords.map(word => word.toLowerCase() === word.data.Word ? showStar = 'star' : showStar = 'unstar')

    return (
        <div onMouseEnter = {() => {setFocusWord(word)}} className = 'card'>
            <div className="word-id">
                {idx + 1}
            </div>
            {searched ?  
            <div onClick = {() => {deleteHandler()}} className="action">
                <DeleteRoundedIcon className = 'delete' />
            </div>: 
            <div onClick = {() => {starHandler()}} className="action">
                <StarRoundedIcon className = 'star' /> 
            </div>}
            {word.data.Word.charAt(0).toUpperCase() + word.data.Word.toLowerCase().slice(1)}
        </div>
    )
}

export default MultiWord
