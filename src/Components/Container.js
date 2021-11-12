import React, { useEffect, useState, useRef } from "react";
import "./Container.css";
import ContainerBody from "./ContainerBody";
import Header from "./Header";
import db from "../firebase";
import ProgressBar from "./ProgressBar";
import Notes from "./Notes";
import MultiWords from "./MultiWords";

const getMeaning = (word) => {
  if (word) {
    return fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" +
        word.split(" ").join("-")
    ).then((response) => response.json());
  }
};

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../../public/images", false, /\.(png|jpe?g|svg)$/)
);

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Container({ messageCount, setMessageCount, allWords, setAllWords }) {
  // const [words, setWords] = useState([]);
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(48);
  let [core, setCore] = useState(false);
  let [shuffle, setShuffle] = useState(false);
  let [searched, setSearched] = useState(false);
  let [searchedWords, setSearchedWords] = useState([]);
  let [searchWord, setSearchWord] = useState(false);
  let [starred, setStarred] = useState(false);
  let [starredWords, setStarredWords] = useState(false);
  let [relatedSearch, setRealtedSearch] = useState();
  let [notify, setNotify] = useState("notification");
  let [progress, setProgress] = useState(0);
  let [notes, setNotes] = useState();
  let [practice, setPractice] = useState("study");
  let [showNotes, setShowNotes] = useState(false);
  let [view, setView] = useState("answer-details hidden");
  let [count, setCount] = useState(0);
  let [grid, setGrid] = useState(false);

  var seed = 1;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function shuffleData(arra1) {
    if (!searched) {
      var ctr = arra1.length,
        temp,
        index;

      while (ctr > 0) {
        if ((starred || searched) && notify === "notification selected") {
          index = Math.floor(Math.random() * ctr);
        } else {
          index = Math.floor(random() * ctr);
        }
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
      }
      return arra1;
    }
  }

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../../public/images", false, /\.(png|jpe?g|svg)$/)
  );

  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {});
  }

  useEffect(() => {
    db.collection("notes")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) =>
        setNotes(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  useEffect(() => {
    db.collection("star").onSnapshot((snapshot) =>
      setStarredWords(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  let temp;
  // {allWords.map(word => (word.data.))}

  let shortListed = [];
  if (start && typeof start === "string") {
    start = parseInt(start);
  }

  if (end && typeof end === "string") {
    end = parseInt(end);
  }

  if (typeof start !== "number") {
    start = 0;
  }
  if (typeof end !== "number") {
    end = 48;
  }

  let groups = [];

  allWords.map((doc) => {
    if (
      doc.data.group > groups.length &&
      doc.data.Word == doc.data.Word.toUpperCase()
    ) {
      groups.push([doc.data.group, doc.data.Word]);
    }
  });

  allWords.map(
    (doc) =>
      doc.data.group >= start && doc.data.group <= end && shortListed.push(doc)
  );
  if (core && searched === false) {
    let coreList = [];
    shortListed.map(
      (doc, idx) =>
        doc.data.Word.toLocaleUpperCase() === doc.data.Word &&
        coreList.push(doc)
    );
    shortListed = coreList;
  }
  if (shuffle) {
    shortListed = shuffleData(shortListed);
  }

  if (starred) {
    temp = [];
    let tempWords = [];
    shortListed.map(
      (doc, idx) =>
        starredWords[0] &&
        starredWords[0].stars.includes(doc.data.Word) &&
        (tempWords.includes(doc.data.Word)
          ? ""
          : temp.push(doc) && tempWords.push(doc.data.Word))
    );
    shortListed = temp;
  }

  if (relatedSearch) {
    temp = [];
    {
      shortListed.map(
        (doc, idx) =>
          (doc.data.Word.toLowerCase().includes(relatedSearch.toLowerCase()) ||
            doc.data.Meaning.toLowerCase().includes(
              relatedSearch.toLowerCase()
            )) &&
          !temp.includes(doc) &&
          temp.push(doc)
      );
    }
    shortListed = temp;
  }

  temp = [];
  let newTemp = [];
  {
    shortListed.map((word, idx) =>
      temp.includes(word.data.Word.toLowerCase())
        ? ""
        : (newTemp.push(word), temp.push(word.data.Word.toLowerCase()))
    );
  }
  shortListed = newTemp;

  let proceed = false;
  useInterval(() => {
    if (shortListed.length > 0 && notify === "notification selected") {
      let messageIcon = undefined;
      if (
        images[
          shortListed[messageCount].data.Word.toLocaleLowerCase() + "-B.jpg"
        ]
      ) {
        messageIcon =
          images[
            shortListed[messageCount].data.Word.toLocaleLowerCase() + "-B.jpg"
          ].default;
      }

      let notification = new Notification(
        shortListed[messageCount].data.Word.toUpperCase(),
        {
          body:
            "Meaning : " +
            shortListed[messageCount].data.Meaning +
            "\n" +
            "Example : " +
            shortListed[messageCount].data.Example,
          icon: messageIcon + "\n-\n-\n-\n",
        }
      );

      setMessageCount((messageCount) => messageCount + 1);
    }
  }, 1000 * 5 * 60);

  if (allWords.length > 0 || ((core || starred) && shortListed.length > 0)) {
    proceed = true;
  }

  return (
    <div className="container">
      {(starred || searched) && grid && (
        <MultiWords
          shortListed={shortListed}
          getMeaning={getMeaning}
          setStarred={setStarred}
          setSearched={setSearched}
          searched={searched}
          setGrid={setGrid}
        />
      )}

      {notes && showNotes && (
        <Notes
          setView={setView}
          notes={notes}
          setNotes={setNotes}
          setShowNotes={setShowNotes}
        />
      )}

      {proceed && (
        <Header
          starred={starred}
          searched={searched}
          setGrid={setGrid}
          setCount={setCount}
          groups={groups}
          shortListed={shortListed}
          setStart={setStart}
          setEnd={setEnd}
          setShowNotes={setShowNotes}
          notify={notify}
          setNotify={setNotify}
          setSearchWord={setSearchWord}
          length={shortListed.length}
        />
      )}
      <ProgressBar progress={progress} practice={practice} />

      {proceed && (
        <ContainerBody
          count={count}
          setCount={setCount}
          view={view}
          setView={setView}
          practice={practice}
          setPractice={setPractice}
          setProgress={setProgress}
          relatedSearch={relatedSearch}
          setRealtedSearch={setRealtedSearch}
          starredWords={starredWords}
          starred={starred}
          setStarred={setStarred}
          setSearchWord={setSearchWord}
          searchWord={searchWord}
          searched={searched}
          setAllWords={setAllWords}
          searched={searched}
          searchedWords={searchedWords}
          setSearched={setSearched}
          getMeaning={getMeaning}
          shortListed={shortListed}
          setStart={setStart}
          setEnd={setEnd}
          setCore={setCore}
          setShuffle={setShuffle}
        />
      )}
    </div>
  );
}

export default Container



