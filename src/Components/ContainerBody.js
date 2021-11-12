import React, { useEffect, useState } from 'react';
import './ContainerBody.css';
import WordCard from './WordCard';
import Options from './Options';
import Practice from './Practice';

function ContainerBody({ count, setCount, view, shuffle, setView, practice, setPractice, setProgress, relatedSearch, setRealtedSearch, starredWords, setStarred, starred, setSearchWord, searchWord, searched, setAllWords, setSearched, shortListed, setStart, setEnd, setCore, setShuffle, getMeaning }) {

    let [practiceWord, setPracticeWord] = useState([false, {}])
    let [meaningSwitch, setMeaningSwitch] = useState(false)
    let [star, setStar] = useState('star-word')
    let [viewText, setViewText] = useState('Show')
    
    
    return (
        <div className='container-body'>
            
            {practice === 'practice' && <Practice  setView = {setView} setViewText = {setViewText}shortListed={shortListed} setPracticeWord={setPracticeWord} />}

            {
                practice === 'practice' ? 

                <WordCard  searched = {searched} setStart = {setStart} setProgress = {setProgress} starredWords = {starredWords} starred = {starred} setStarred = {setStarred} view = {view} viewText = {viewText}  setView = {setView} setViewText = {setViewText} setSearchWord = {setSearchWord} searchWord = {searchWord} star = {star} setStar = {setStar} meaningSwitch={meaningSwitch} getMeaning={getMeaning} doc={practiceWord[1]} setCount={setCount} count={count} length={shortListed.length} />

                : <WordCard  searched = {searched} setStart = {setStart} setProgress = {setProgress} starredWords = {starredWords} starred = {starred} setStarred = {setStarred}  view = {view} viewText = {viewText}  setView = {setView} setViewText = {setViewText} setSearchWord = {setSearchWord} searchWord = {searchWord} star = {star} setStar = {setStar} meaningSwitch={meaningSwitch} getMeaning={getMeaning} doc={shortListed[count]} setCount={setCount} count={count} length={shortListed.length} />}

            <Options shuffle = {shuffle} relatedSearch = {relatedSearch} setRealtedSearch = {setRealtedSearch} setStarred = {setStarred} setView = {setView} setViewText = {setViewText} setSearchWord = {setSearchWord} searched = {searched} setAllWords = {setAllWords} setSearched = {setSearched} setPractice={setPractice} setStart={setStart} setEnd={setEnd} setCore={setCore} setShuffle={setShuffle} setCount={setCount} setMeaningSwitch={setMeaningSwitch} />

        </div>
    )
}

export default ContainerBody
