import React from 'react'
import { languages } from './languages'
import clsx from 'clsx'


function App() {
  
  const [currentWord, setCurrentWord] = React.useState("react")
  const [guessedLetters, setGuessedLetters] = React.useState([])
  console.log(guessedLetters)

    function handleGussedLetters(letter){
        setGuessedLetters(prevLetters =>
        
        //avoiding duplicates using includes
        prevLetters.includes(letter) ? 
        prevLetters : 
        [...prevLetters, letter]

       
        //or using a set to avoid duplicates
        // Array.from(new Set([...prevLetters, letter])
    )
    }

  
  //mapping through each letter of the current word to create word letter boxes
  //To conver str to array use arr.split('') or [...str]
  const wordElements = [...currentWord].map((letter, index)=>
    <span className='letter-box' key={index}>
      {guessedLetters.includes(letter)? letter.toUpperCase() :" "}
      </span>)

  //Mapping through languages array to create each language box 
  const languagesElements = languages.map(lang => <div 
    className='language-box'
    key={lang.name} 
    style={{backgroundColor: lang.backgroundColor, color: lang.color}}>
    {lang.name} 
    </div>
 )
  //Creating alphabet buttons
   const alphabet = "abcdefghijklmnopqrstuvwxyz"
   const alphabetElements = [...alphabet].map((letter, index) =>{
      const isGuessed = guessedLetters.includes(letter)
      const isCorrect = isGuessed && currentWord.includes(letter)
      const isWrong=  isGuessed && !currentWord.includes(letter)
      const className = clsx('alpha-letter', isCorrect && 'right', isWrong &&'wrong')
      return<button 
       key={index}  
       onClick={()=>handleGussedLetters(letter)}
       className={className}>
        {letter.toLocaleUpperCase()}
      </button>
   }

   )

  return(
  <main>
      <header>
        <h1>Word Guessing Game</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe!</p>
      </header>
      <section className='game-status'>
        <h2>You win!</h2>
        <p>Well done!🎉</p>
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
        <button className="new-game">New Game</button>

 
    </main>
  )
}

export default App
