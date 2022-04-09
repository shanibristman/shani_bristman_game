const [num, SetNum]=useState(0);
  const [oneQuestion, SetOneQuestion]=useState("");
  const [answersW,SetAnswersW]=useState();
  const [correct, SetCorrect]= useState();
  const [game,SetGame] = useState();


  const randomNumber=()=>{
    let min = 0;
    let max = 50;
    let rand =  min + (Math.random() * (max-min));
    SetNum(parseInt(rand));
  }
  const load = async ()=>{
    
    randomNumber();

    try{
      let res = await fetch(`./db/quiz.json`);
      let data = await res.json();

      let q = await data[0].question
      SetOneQuestion( await q);
      let a = await data[0].incorrect_answers;
      SetAnswersW(await a);
      let b = await data[0].correct_answer
      SetCorrect( [...answersW,await b]); 
    }
    catch(error){
      console.log(error);
    }
  }

  const loadQ = async() =>{
    
    await load();
    let q = {question :oneQuestion, answers : correct};
    SetGame([...game, q]);
    console.log("hiii" + game);
 
  }

  const startGame =()=>{
    loadQ();
    
  }

  // useEffect(()=> {
  //   load();
  // } ,[] )

 //q2 
//   const [num, SetNum]=useState(1);
//   const [question, SetQuestion] = useState();
//   const [answers, SetAnswers] = useState([]);
//   const [correctAnswer, SetCorrectAnswer] = useState();
//   const [arrAnswer, SetArrAnswer] = useState([]);
//   const [score, SetScore] = useState(0);
//   const [bestScore, SetBestScore] = useState(0);


//   const randomNumber=()=>{
//     let min = 0;
//     let max = 50;
//     let rand =  min + (Math.random() * (max-min));
//     SetNum(parseInt(rand));
//   }
//   const load = async ()=>{
//     randomNumber();
//     try{
//       let res = await fetch(`https://opentdb.com/api.php?amount=100`);
//       let data = await res.json();

//         SetQuestion(data.results[num].question);
//         SetAnswers(data.results[num].incorrect_answers);
//         SetCorrectAnswer(data.results[num].correct_answer);
//         console.log(question);
//         console.log(correctAnswer);
//         console.log(answers);
      
//     }
//     catch(error){
//       console.log(error);
//     }
//   }

//   const mixAnswer=() =>{
//       let size = 1+ answers.length();
//       let arr= [];
//   }
//   const chooseAnswer =(element)=>{
//     if(element.value == correctAnswer){
//       SetScore(parseInt(score)+10);
//       console.log(score);
//       element.style.color = "#242424";
//       }
//   }
//   // useEffect(()=>{ 
//   //   load();
//   // },[num]);

//   return (
//     <div className="App">
//       <input type="number" value={num} onChange={(event)=>SetNum(event.target.value)}/>
//       <button onClick={load}> start </button>
//       <div className="allGame">
//       <div className="question">
//         {question}
//       </div>

//       <div className="answer" onClick={chooseAnswer}>
//         {answers.map(a =>
//         <button>{a}</button>
//         )}
//         <button value={correctAnswer}>{correctAnswer}</button>
//       </div>
//       </div>
//     </div>
//   );
// }