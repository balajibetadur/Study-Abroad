import Container from './Components/Container';
import './App.css';
import { useState } from 'react';
import words from './words.json';
// const handler = (event) => {
//   // changing the state to the name of the key
// // which is pressed
// console.log(event.key, event.keyCode);
// };


function App() {

  let [allWords, setAllWords] = useState(words)
  
  let [messageCount, setMessageCount] = useState(0)
  return (
    <div  className="App">
      {/* <Header/> */}
      <Container messageCount = {messageCount} setMessageCount = {setMessageCount} allWords = {allWords} setAllWords = {setAllWords} />
    </div>
  );
}

export default App;






// import words from './words.json';
// words.forEach((doc) => {

//     if (doc.Word.toLocaleUpperCase() === doc.Word){

//       doc.starred = false;
//       doc.searched = false
//       console.log(doc);
//       db.collection("words").add({
//         word: doc.Word,
//         meaning: doc.Meaning,
//         example: doc.Example,
//         synonyms: doc.Synonyms,
//         starred: doc.starred,
//         group: doc.group,
//         id: doc.id,
//         searched: doc.searched
//       })
//     }
  
// });