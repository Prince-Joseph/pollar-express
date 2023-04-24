const startButton = document.getElementById("start") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const snoozeButton = document.getElementById("snooze") as HTMLButtonElement;
const timerElement = document.getElementById("timer") as HTMLDivElement;
const questionActiveElement = document.getElementById("question-active") as HTMLDivElement;
//@ts-ignore
const choicesElement = document.getElementById("choices") as HTMLDivElement;
const questionIdHidden = document.getElementById("pollId") as HTMLInputElement;
const questionId = questionIdHidden.value as string;

startButton.addEventListener("click", ()=>{
    fetch(`/question/start/${questionId}/`);    
})


stopButton.addEventListener("click", ()=>{
    fetch(`/question/stop/${questionId}/`)
})

snoozeButton.addEventListener("click", ()=>{
    fetch(`/question/snooze/${questionId}/`)
})


interface choiceData{
    id?: number,
    value?: string,
    count?: number,
}

interface questionData {
    question ?: string,
    duration ?: string,
    isActive ?: boolean,
    choices ?: Array<choiceData>,
    expireAt ?: string,
    timeLeft ?:number,
    count ?: number,
}

function updateQuestionManagerUI(questionData:questionData){

    if (questionData.isActive) {
        timerElement.innerHTML = `${questionData.timeLeft}`;
        questionActiveElement.innerHTML = `True`;
        
    }
    else{
        timerElement.innerHTML = `00:00`;
        questionActiveElement.innerHTML = `False`;
    }
}

function fetchQuestionData(){
    fetch(`/question/${questionId}/`)
    .then(res => res.json())
    .then(data => updateQuestionManagerUI(data));
}

var intervalId = window.setInterval(function(){
    fetchQuestionData();
}, 500);



