import React from 'react'
import './Header.css';
import SearchBar from './SearchBar';

function Header({starred, searched, setGrid, setCount, groups, shortListed, setStart, setEnd, notify, setShowNotes, setNotify, setSearchWord, length}) {
    let heading = 'GRE Word Beast';
    return (

        <div className = 'header'>
            <p className = "header-title">{heading}</p>
            <SearchBar starred = {starred} searched = {searched} setGrid = {setGrid} setCount = {setCount} groups = {groups} shortListed = {shortListed} setStart = {setStart} setEnd = {setEnd} setShowNotes = {setShowNotes} notify = {notify} setNotify = {setNotify} setSearchWord = {setSearchWord} length = {length}/>

        </div>

    )
}

export default Header
