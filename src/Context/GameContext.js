import { useState, createContext } from "react";
import '../App.css';

export const GameContext = createContext();

export default function GameContextProvider(props) {

    const [start,SetStart]=useState(false);
    const [num, SetNum]=useState(1);
    const [question, SetQuestion] = useState();
    const [answers, SetAnswers] = useState([]);
    const [correctAnswer, SetCorrectAnswer] = useState();
    const [rep, SetRep] = useState(1);
    const [score, SetScore] = useState(0);
    const [bestScore, SetBestScore] = useState(0);
    const [style, SetStyle] = useState("cont");
    const [showStyle, SetShowStyle] = useState("cont");
    const [time, SetTime] = useState(59);
    const [end, SetEnd] = useState(true);
    const [name, SetName] = useState("player1");



    const randomNumber = () => {
        let min = 0;
        let max = 50;
        let rand = min + (Math.random() * (max - min));
        SetNum(parseInt(rand));
    }

    const mixArr =(arr)=>{
        let l= arr.length;
        let min = 0;
        let max = l;
        let randArr =[];
        let newArr=[];

        for(let i=0; i<l;i++){
            randArr[i]=i;
        }

        for(let i =0;i<l;i++){
            
            let rand = min + (Math.random() * (max - min));
            while(randArr[rand]==null){
                 rand = min + (Math.random() * (max - min));
            }
            if(randArr[rand]!=null){
                newArr.push(arr[i]);
                randArr[rand]=null;
            }
        }

        return newArr;
    }

    const load = async () => {
        randomNumber();
        SetTime(59);

        try {
            let res = await fetch(`https://opentdb.com/api.php?amount=100`);
            let data = await res.json();
            let arr =[] 
            let temp =[]
            SetQuestion(data.results[0].question);

             if(rep%2==0 && rep%4==0){
                temp = data.results[0].incorrect_answers;
                for(let i=1;i<temp.length;i++){
                    arr.push(temp[i]);
                }
                arr.push(data.results[0].correct_answer);
                arr.push(data.results[0].incorrect_answers[0]);
            }
            else if(rep%2==0){
                 arr =[...data.results[0].incorrect_answers, data.results[0].correct_answer];
            }
            else if(rep%3==0){
                temp = data.results[0].incorrect_answers;
                arr.push(data.results[0].incorrect_answers[0]);
                arr.push(data.results[0].correct_answer);
                for(let i=1;i<temp.length;i++){
                    arr.push(temp[i]);
                }
            }
            else{
                 arr =[data.results[0].correct_answer, ...data.results[0].incorrect_answers];
            }
            //let NewArr = mixArr(arr);
            SetAnswers(arr);
            SetCorrectAnswer(data.results[0].correct_answer);
            SetRep(rep + 1);
            SetShowStyle(false)

        }
        catch (error) {
            console.log(error);
        }
    }


    const testAnswer =(element,str) =>{
        let strToReturn = "";
        if(element === str){
            SetScore(parseInt(score) + 10);

            strToReturn = "good job!:)"
        }
        else{
            strToReturn = ":("
        }
        SetShowStyle(true);
        //alert(strToReturn);
    }

    const updateScore=()=>{
        
        if(score>bestScore){
            SetBestScore(score);
        }
    }

    let ChangeStatuse = () => {
        SetStart(false);
        SetRep(1);
        SetScore(0);
        updateScore();
    }

    return (
        <GameContext.Provider value={{name, SetName,end,SetEnd,ChangeStatuse,time , SetTime, style,start,SetStart,question,answers,correctAnswer,showStyle, load,testAnswer,score,bestScore,rep,SetRep,updateScore}}>
            {props.children}
        </GameContext.Provider>
    )
}
