const votersListElement = document.querySelector("#voters-list") as HTMLDivElement;
const voterTemplate = votersListElement.children[0] as HTMLSpanElement;
const pollIdElement = document.querySelector("#pollId") as HTMLInputElement;
const timeStatusElement = document.querySelector("#time-status") as HTMLInputElement;

//@ts-ignore
var choicesElement = document.querySelector("#choices") as HTMLDivElement;
const choiceTemplate = document.querySelector("#choice-template") as HTMLDivElement;

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

function TimeStatusElement(data: questionData){
    if (data['isActive']== true){
        return (`${data['timeLeft']} left`)
    }
    else{
        return (`Question is not active`)

    }
}
function ChoicesElement(data: questionData){
    const choices = data["choices"] as Array<choiceData>;
    const choicesContainer = choicesElement.cloneNode(true) as HTMLDivElement;
    choicesContainer.innerHTML = ``;

    // create new element
    for (const choice of choices){
        const choiceEl = choiceTemplate.cloneNode(true) as HTMLDivElement;
        const count_ratio = Number(choice["count"])/Number(data["count"])*100
        let count_ratio_cleaned = "";
        if (isNaN(count_ratio)){
            count_ratio_cleaned = '0';
        }else{
            count_ratio_cleaned = count_ratio.toFixed(0);
        }
        choiceEl.children[0].innerHTML = `${choice["value"]}`;
        choiceEl.children[1].innerHTML = `${count_ratio_cleaned}%`;
        // @ts-ignore
        choiceEl.children[2].style.width = `${count_ratio_cleaned}%`;
        choicesContainer.appendChild(choiceEl);
    }
    return choicesContainer.innerHTML;
}


function VotersElement(data: questionData){
    const votersContainer = votersListElement.cloneNode(true) as HTMLDivElement;
    if (data['latest_voters']){
        votersContainer.innerHTML = ``;

        for(const voter of data['latest_voters']){
            const voterEl = votersListElement.cloneNode(true) as HTMLSpanElement;
            voterEl.innerHTML = voter;
            votersContainer.appendChild(voterEl);
        }
    }
    else{
        votersContainer.innerHTML = ``;
    }
    return votersContainer.innerHTML;
}

function updateUI(data: questionData){

    timeStatusElement.innerHTML = TimeStatusElement(data);
    //@ts-ignore
    // choicesElement.parentNode.replaceChild(ChoicesElement, choicesElement);
    choicesElement.innerHTML = ChoicesElement((data));
    votersListElement.innerHTML = VotersElement(data);
    console.log('hi');
    
}


var intervalId = window.setInterval(function(){
    fetchUpdate(`/question/${pollId}/`);
  }, 1000);

fetchUpdate(`/question/${pollId}/`);






