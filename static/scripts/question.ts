const questionElement = document.querySelector("#question") as HTMLDivElement;
const choicesElement = document.querySelector("#choices") as HTMLDivElement;


function fetchUpdate(){
    fetch('/question/1')
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
    count ?: number,
}

function updateUI(data: questionData){
    questionElement.innerHTML = `${data["question"]} ${data["isActive"]}  ${data["expireAt"]}` ?? "";
    
    const choices = data["choices"] as Array<choiceData>;
    choicesElement.innerHTML = ``;
    // create new elemt
    for (const choice of choices){
        const choiceEl = document.createElement("p");
        choiceEl.innerHTML = `${choice["value"]} ${choice["count"]}` ?? "";
        choicesElement.appendChild(choiceEl);
    }
}


var intervalId = window.setInterval(function(){
    fetchUpdate();
  }, 500);







