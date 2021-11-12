import React, { useEffect, useState } from 'react'
import './SearchBar.css';
import { Search } from '@material-ui/icons';
import db from '../firebase'
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import GridOnRoundedIcon from '@material-ui/icons/GridOnRounded';
import Flashcard from './Flashcard';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    // color: 'black',
  },
}));

function SearchBar({ starred, searched,  setGrid, groups, setCount, setStart, setEnd, notify, setShowNotes, setNotify, setSearchWord, length}) {

    let [search, setSearch] = useState('search-bar-word hidden');
    const handleIn = (mode) => {
        setSearch(mode)
    }
    async function handleSubmit(e){
        e.preventDefault();
        let searchKeyword = (e.target.elements.searchKeyword.value).split(' ').join('-')
        e.target.elements.searchKeyword.value = ''
        
        const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + searchKeyword);
        
        const responseData = await response.json();
        
        let wordInfo = {}

        wordInfo['Word'] = searchKeyword
        try {
            
        
        if(responseData[0].meanings[0].definitions[0].definition){
            wordInfo['Meaning'] = responseData[0].meanings[0].definitions[0].definition
        }else{
            wordInfo['Meaning'] = 'Meaning Not Available'
        }
        if(responseData[0].meanings[0].definitions[0].example){
            wordInfo['Example'] = responseData[0].meanings[0].definitions[0].example
        }else{
            wordInfo['Example'] = 'Example Not Available'
        }
        if(responseData[0].meanings[0].definitions[0].synonyms){
            wordInfo['Synonyms'] = responseData[0].meanings[0].definitions[0].synonyms
        }else{
            wordInfo['Synonyms'] = ['Synonyms Not Available']
        }
        } catch (error) {
            wordInfo['Meaning'] = 'Meaning Not Available'
            wordInfo['Example'] = 'Example Not Available'
            wordInfo['Synonyms'] = ['Synonyms Not Available']
        }
        
        wordInfo['starred'] = false
        console.log(wordInfo)
        
        setSearchWord(wordInfo)
        
        if (wordInfo['Meaning'].includes('Not Available') && (wordInfo['Example'].includes('Not Available'))){
            console.log('Meaning not found')
        }else{

            db.collection('search').add({
                Word: wordInfo['Word'],
                Meaning: wordInfo['Meaning'],
                Example: wordInfo['Example'],
                Synonyms: wordInfo['Synonyms'],
                starred: wordInfo['starred'],
                id: 1,
                group: 1
            })
        }
        }


    let handleNotify = () => {
        if (notify === 'notification'){
            setNotify('notification selected')
        }else{
            setNotify('notification')

        }
    }

    let handleNotes = () => {
        setShowNotes(true)
    }
    

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    let keyPress = (e) => {
        console.log(e.Key)
        if (e.key === 'Escape') {
            setOpen(false)
        }
    }

    useEffect(() => {

        document.addEventListener('keydown', keyPress)
        return () => document.removeEventListener("keydown", keyPress);
    });

    return (
        <form onSubmit = {handleSubmit} className = 'header-right'>


        <Backdrop className= {classes.backdrop} open={open} onClick={handleClose}>
            <div className="card-container">
                
                {groups.map((group) => 
                
                    <Flashcard setCount = {setCount} setStart = {setStart} setEnd = {setEnd} num = {group[0]} word = {group[1]}/>
                
            )}

            </div>
        </Backdrop>

        {(starred || searched) &&
        <div  onClick={() => setGrid(true)}  className="flash-cards-words" >
            <GridOnRoundedIcon/>    
        </div>
        }
        
        <div  onClick={handleToggle}  className="flash-cards" >
            <DashboardRoundedIcon/>    
        </div>

        <div fontSize="large" onClick = {() => {handleNotes()}} className="notes" >
            <PlaylistAddRoundedIcon/>    
        </div>

        <div onClick = {() => {handleNotify()}} className={notify}>
            <NotificationsActiveRoundedIcon/>
        </div>

        <div className = 'word-count'>
            {length} words
        </div>

        <div onMouseEnter = {() => {handleIn("search-bar-word")}} onMouseLeave = {() => {handleIn("search-bar-word hidden")}} className = 'search-word'>
            <Search className = 'search-icon'/>
            <input type="text" autoComplete = {'off'} name = 'searchKeyword' className={search} autoFocus={true} placeholder = 'Search Meaning' />
        </div>
        </form>
    )
}

export default SearchBar
