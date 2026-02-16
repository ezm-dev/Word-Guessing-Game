
import { useState, useEffect } from 'react'
import { languages } from './languages'
import clsx from 'clsx'
import { getFarewellText } from './utils'


function App() {
  // State values
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [farewellText, setFarewellText] = useState("")
  //console.log(guessedLetters)

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
 
  //check if the last guessed letter is wrong to show the farewell message
  const lastGuessedLetter = guessedLetters[guessedLetters.length -1]
  const isLastGuessedLetterWrong = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
  //console.log(wrongGuessCount)

  //check if gameover
  const isGameWon = [...currentWord].every(l => guessedLetters.includes(l))
  const isGameLost = wrongGuessCount >= languages.length
  const isGameOver = isGameWon || isGameLost
  console.log(isGameOver, isGameWon, isGameLost)
  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

    useEffect(()=>{
      if(isLastGuessedLetterWrong){
    const lang = languages[wrongGuessCount-1].name
     setFarewellText( getFarewellText(lang))
      }
  },[wrongGuessCount])
  

  function handleGussedLetters(letter) {
    setGuessedLetters(prevLetters =>

      //avoiding duplicates using includes
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]


      //or using a set to avoid duplicates
      // Array.from(new Set([...prevLetters, letter])
    )
  }

  //Mapping through languages array to create each language box 
  const languagesElements = languages.map((lang, index) => {
    // const className = clsx("language-box", index < wrongGuessCount ? "lost":"")
    return (<span
      className={`language-box ${index < wrongGuessCount ? "lost" : ""}`}
      key={lang.name}
      style={{ backgroundColor: lang.backgroundColor, color: lang.color }}>
      {lang.name}
    </span>)
  })
  //mapping through each letter of the current word to create word letter boxes
  //To conver str to array use arr.split('') or [...str]
  const wordElements = [...currentWord].map((letter, index) =>
    <span className='letter-box' key={index}>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : " "}
    </span>)


  //Creating alphabet buttons
  const alphabetElements = [...alphabet].map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx(isCorrect && 'right', isWrong && 'wrong')
    return <button
      key={index}
      onClick={() => handleGussedLetters(letter)}
      className={className}>
      {letter.toLocaleUpperCase()}
    </button>
  }

  )

  //game status section classes and content
   const gameStatusClass = clsx("game-status", isGameWon&&"won", isGameLost&&"lost")

   const gameStatuscontent = isGameOver? (isGameWon?
            (<>
              <h2>You win!</h2>
              <p>Well done!🎉</p>
            </>
            ):
            (<>
              <h2>Game over!</h2>
              <p>You lose! Better luck next time😭</p>
            </>
            )
          )
        : isLastGuessedLetterWrong&&(<p className="farewell-message">{farewellText}</p>)  
      

  return (
    <main>
      <header>
        <h1>Word Guessing Game</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe!</p>
      </header>
      <section className={gameStatusClass}>
        {gameStatuscontent}
        
      </section>

      <section className='languages-container'>
        {languagesElements}
      </section>
      <section className='word-container'>
        {wordElements}
      </section>

      <section className='alphabet-container'>
        {alphabetElements}
      </section>
      {isGameOver && <button className="new-game">New Game</button>}


    </main>
  )
}

export default App
