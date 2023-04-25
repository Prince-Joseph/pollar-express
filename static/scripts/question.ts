const questionElement = document.querySelector("#question") as HTMLDivElement;
//@ts-ignore
const choicesElement = document.querySelector("#choices") as HTMLDivElement;


function fetchUpdate(apiUrl){
    fetch(apiUrl)
    .then(res=>res.json())
    .then(data=> {
        updateUI(data);
        
    });
}

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

function updateUI(data: questionData){
    questionElement.innerHTML = `${data["question"]} ${data["isActive"]} ${data["expireAt"]} <br> ${data["timeLeft"]} secs` ?? "";
    
    const choices = data["choices"] as Array<choiceData>;
    choicesElement.innerHTML = ``;
   
    // create new element
    for (const choice of choices){
        const choiceEl = document.createElement("p");
        choiceEl.innerHTML = `${choice["value"]} ${choice["count"]}` ?? "";
        choicesElement.appendChild(choiceEl);
    }
}


var intervalId = window.setInterval(function(){
    fetchUpdate('/question/1/');
  }, 1000);







