import React from 'react'
import Option from './Option';
import './Options.css';
import words from '../words.json';
import db from '../firebase';
import {
    StarRounded,
    YoutubeSearchedForRounded,
    SpellcheckRounded,
    MenuBookRounded,
    Shuffle,
    RefreshRounded
}
    from '@material-ui/icons';



function Options({ relatedSearch, setRealtedSearch, setStarred, setView, setViewText, setSearchWord, searched, setAllWords, setSearched, setPractice, setStart, setEnd, setCore, setCount, setShuffle, setMeaningSwitch }) {

    const handleClick = (action) => {
        setRealtedSearch(false)
        setPractice(action)
        setStarred(false)
        // setStarred(false)
    }

    let handleRefresh = () => {
        setSearched(false)
        setPractice(false)
        setCount(0)
        setShuffle(false)
        setStart(0)
        setEnd(48)
        setStarred(false)
        setRealtedSearch(false)
        setSearchWord(false)
        setView('answer-details hidden')
        setViewText('Show')
        setAllWords(words)
    }

    let handleSearched = () => {
        if (!searched) {

            db.collection('search').onSnapshot((snapshot) =>
                setAllWords(snapshot.docs.map(
                    doc => ({ id: doc.id, data: doc.data() })))
            )
            
            setSearched(true)
        } else {
            setSearched(false)
            setAllWords(words)
        }
    }

    let handleStarred = () => {
        setStarred(true)
    }

    let handleCore = (event) => {
        setCore(event.target.checked)
        setCount(0)
        setShuffle(false)
    }
    
    let handleSearchRealted = (event) => {
        if ((event.target.value) !== ''){
            
            setPractice('practice')
            setRealtedSearch(event.target.value)
           
        }
    }

    
    return (
        <div className='options-body-container'>
            <div className="group-search">
                <input pattern="[0-9]*" type="number" onKeyDown = {(event) => event.preventDefault()} onChange={event => {setStart(event.target.value)}} className="input-start" placeholder='From' />
                <input pattern="[0-9]*" type="number" onKeyDown = {(event) => event.preventDefault()}  onChange={event => setEnd(event.target.value)} className="input-end" placeholder='To' />
            </div>

            <div onChange={event => {handleSearchRealted(event)}} className="option-search-related">
                <input type="text" name = 'search-realted' className="search-related" placeholder = 'Related Words'/>
            </div>
            <div onClick={() => { handleRefresh() }} className="refresh-option">
                <Option className='option refersh' icon={<RefreshRounded />} text={'Refresh'} />
            </div>
            <div  onClick={() => { handleStarred() }} className="option-star">
                <Option className='option starred' icon={<StarRounded />} text={'Starred'} />
            </div>

            <div onClick={() => { handleSearched() }} className="option-searched">
                <Option className='option searched' icon={<YoutubeSearchedForRounded />} text={'Searched'} />
            </div>

            <div onClick={() => setShuffle(true)} className="option-shuffle">
                <Option className='option shuffle' icon={<Shuffle />} text={'Shuffle'} />
            </div>

            <div onClick={() => handleClick('practice')} className="option-practice">
                <Option className='option practice' icon={<SpellcheckRounded />} text={'Practice'} />
            </div>
            <div onClick={() => handleClick('study')} className="option-study">
                <Option className='option study' icon={<MenuBookRounded />} text={'Study'} />
            </div>

            <div className="option checkbox">
                <input onChange={event => { handleCore(event) }} type="checkbox" id='core-checkbox' className="core-checkbox" />
                <label htmlFor="core-checkbox">Core Words</label>
            </div>

            <div className="option checkbox">
                <input onChange={(event) => { setMeaningSwitch(event.target.checked) }} type="checkbox" id='meaning-checkbox' className="meaning-checkbox" />
                <label htmlFor="meaning-checkbox">Meaning</label>
            </div>

        </div>
    )
}

export default Options
