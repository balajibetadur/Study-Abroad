import React, { useEffect, useState } from 'react'
import './Notes.css'
import  Note from './Note'
import db from '../firebase'
import CloseIcon from '@material-ui/icons/Close';

function Notes({ setView, notes, setShowNotes, setNotes }) {

    let handleNewNote = () => {
        db.collection('notes').add({
            note: '',
            date: new Date()
        })
    }
    let keyPress = (e) => {
        console.log(e.Key)
        if (e.key === 'Escape') {
            setShowNotes(false)
        }
    }

    useEffect(() => {

        document.addEventListener('keydown', keyPress)
        return () => document.removeEventListener("keydown", keyPress);
    });
    // notes.sort(function(a,b){
    //     return new Date(a.date) - new Date(b.date);
    // });
    
    setView('answer-details hidden')
      
    return (
        <div  className = 'notes-body'>
            <CloseIcon className = 'notes-cancel' onClick = {() => {setShowNotes(false)}}/>
            {notes && notes.map((note, idx) => (
                <Note note = {note} senotes = {setNotes}/>
            ))}
            
            <div onClick = {() => handleNewNote()} className="add-note">
                +
            </div>
        </div>
    )
}

export default Notes
