// createQuestion.ts

const choiceInputContainer = document.querySelector('[name="value"]') as HTMLInputElement;
const choiceErrorContainer = document.getElementById("choice-errors") as HTMLDivElement;

if (choiceErrorContainer) {
    choiceErrorContainer.innerHTML = "Maximum of 50 characters are allowed";
}

if (choiceInputContainer) {

    choiceInputContainer.addEventListener('input', () => {
        let lengthChoice = choiceInputContainer.value.length;
        let lengthLeft = String(50 - lengthChoice);
        choiceErrorContainer.innerHTML = `${lengthLeft} characters left`;
        })
}

const questionInputContainer=document.querySelector('[name="question"]') as HTMLInputElement;
const questionErrorsContainer = document.getElementById("question-errors") as HTMLDivElement;
if (questionErrorsContainer){
    questionErrorsContainer.innerHTML="Maximum of 250 characters are allowed";
}
if(questionInputContainer){
    questionInputContainer.addEventListener('input', ()=>{
        let lengthQuestion = questionInputContainer.value.length;
        let lengthLeft = String(250-lengthQuestion);
        questionErrorsContainer.innerHTML= `${lengthLeft} characters left`;
    })
}

const durationTime = document.querySelector('[name="duration"]') as HTMLInputElement;
const durationRemainingTime = document.getElementById("duration-error-message") as HTMLDivElement;
const _is_alphabet =  /[a-zA-Z]/;

if(durationRemainingTime) {
    let durationValue = durationTime.value;
    if(durationValue === ""){
        durationRemainingTime.innerHTML = "";
     
    }
    else{
    durationRemainingTime.innerHTML = parseDuration(durationValue);
    }
}
if(durationTime){
    durationTime.addEventListener('input',()=>{
        let durationValue = durationTime.value;
        console.log(durationValue);
        
        if(durationValue === ""){
            durationRemainingTime.innerHTML = "";
         
        }
        else{
            if(_is_alphabet.test(durationValue)){
                durationRemainingTime.innerHTML = "Invalid duration";
            }
            else{
                let durationInWords = parseDuration(durationValue);
                console.log(parseDuration(durationValue))
                durationRemainingTime.innerHTML = durationInWords;
            }
        }

    })
}


//  STRING TO WORD TIME

// Returns a duration string in the format "HH hours MM minutes SS seconds"
function parseDuration(duration:string) {
    const match = duration.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);

    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const seconds = parseInt(match[3], 10);
      return `${hours} hours ${minutes} minutes ${seconds} seconds`;
    }

    const matchWithoutHours = duration.match(/^(\d{1,2}):(\d{2})$/);

    if (matchWithoutHours) {
      const minutes = parseInt(matchWithoutHours[1], 10);
      const seconds = parseInt(matchWithoutHours[2], 10);
      return `${minutes} minutes ${seconds} seconds`;
    }

    const seconds = parseInt(duration, 10);

    if (!isNaN(seconds)) {
      return `${seconds} seconds`;
    }

    return 'Invalid duration';
  }
