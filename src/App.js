import { useEffect, useState } from 'react'
import './App.css'
import OneCard from './components/OneCard'

const cardImages = [
  { "src": "/img/helmet-1.png",match:false },
  { "src": "/img/potion-1.png",match:false },
  { "src": "/img/ring-1.png",match:false },
  { "src": "/img/scroll-1.png",match:false },
  { "src": "/img/shield-1.png",match:false },
  { "src": "/img/sword-1.png",match:false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled,setDisabled]=useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  useEffect(()=>{
    shuffleCards();
  },[])

  useEffect(()=>{
    if (choiceTwo&&choiceOne){
      setDisabled(true);
      if(choiceTwo.src===choiceOne.src){
        setCards(pre=>{
          return pre.map((card=>{
            if(card.src===choiceOne.src){
              return {...card,match:true}
            }else{
              return card;
            }
          }))
        })
        
        resetTurn()
        console.log(cards)
      }
      else{
        setTimeout(() => {
          resetTurn();
        }, 1000);
        
      }
      
    }
  },[choiceTwo,choiceOne]);

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn=()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(pre=>pre+1);
    setDisabled(false);
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <h1>For Emre</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <OneCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={choiceOne===card || choiceTwo===card || card.match }
            disabled={disabled}
          />
        ))}
      </div>
          <p>{turns}</p>
    </div>
  );
}

export default App
