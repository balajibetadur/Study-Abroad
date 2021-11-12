import React, { useEffect, useRef, useState } from 'react'
import './Note.css'
import autosize from 'autosize';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import db from '../firebase';

function Note({ note, setNotes  }) {


  let handleNoteDelete = () => {
    db.collection('notes').doc(note.id).delete()
    
  }

  let handleChange = (event) => {
    db.collection('notes').doc(note.id).update({
      'note': event.target.value
  })
  }

  let dValue = '';
  if(note.data.note === ''){
    dValue = ''
  }else{
    dValue = note.data.note
  }

  console.log(note.data.note, dValue)

  return (
    <div  className='note'>
      {note && <TextareaAutosize onChange = {(event) => {handleChange(event)}} aria-label="minimum height" className="note-text" cols='105' rowsMin={3} placeholder="Enter Note" defaultValue= {dValue} />}
      {note && <DeleteRoundedIcon onClick = {() => {handleNoteDelete()}} className = 'delete-note'/>}

    </div>
  )
}

export default Note

