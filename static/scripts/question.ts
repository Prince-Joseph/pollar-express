const pollIdElement = document.querySelector("#pollId") as HTMLInputElement;
const questionElement = document.querySelector("#question") as HTMLDivElement;
//@ts-ignore
const choicesElement = document.querySelector("#choices") as HTMLDivElement;

const pollId = pollIdElement?.value as string;
console.log(pollId);

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
    voters ?: Array<any>,
    latest_voters ?: Array<any>,
}

function updateUI(data: questionData){
    questionElement.innerHTML = `
    ${data["question"]} ${data["isActive"]} ${data["expireAt"]}
    <br> ${data["timeLeft"]} secs <br> ${data["count"]}
    <br>${data["voters"]}<br>
    <br>${data["latest_voters"]}<br>
    ` ?? "";
    
    const choices = data["choices"] as Array<choiceData>;
    choicesElement.innerHTML = ``;
   
    // create new element
    for (const choice of choices){
        const choiceEl = document.createElement("p");
        choiceEl.innerHTML = `
        ${choice["value"]} ${choice["count"]}
        <br>
        <div class="bar-container">
          <div style="width:${Number(choice["count"])/Number(data["count"])*100}%;" class="bar"></div>
        </div>
        ` ?? "";
        choicesElement.appendChild(choiceEl);
    }
}


var intervalId = window.setInterval(function(){
    fetchUpdate(`/question/${pollId}/`);
  }, 1000);

fetchUpdate(`/question/${pollId}/`);






