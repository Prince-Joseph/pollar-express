const profileFormNameContainer = document.getElementById('name-form-container');
const profileFormRollNumberContainer = document.getElementById('rollnumber-form-container');
const profileFormMobileNumberContainer = document.getElementById('mobilenumber-form-container');


const nameInput = profileFormNameContainer?.querySelector('input') as HTMLInputElement;
const rollNumberInput = profileFormRollNumberContainer?.querySelector('input') as HTMLInputElement;
const mobileNumberInput = profileFormMobileNumberContainer?.querySelector('input') as HTMLInputElement;

const nameErrorContainer = profileFormNameContainer?.querySelector('.error-container') as HTMLDivElement;
const rollNumberErrorContainer = profileFormRollNumberContainer?.querySelector('.error-container') as HTMLDivElement;
const mobileNumberErrorContainer = profileFormMobileNumberContainer?.querySelector('.error-container') as HTMLDivElement;


nameInput?.addEventListener('input', ()=> {
    let nameValue = nameInput.value;
    console.log(nameValue) 
    let max_length = 50;   
    if (nameValue.length > max_length) {
        nameErrorContainer.children[0].innerHTML = `The name field should be less than or equal to ${max_length} characters in length.`;
    }
    else if (!nameValue) {
        nameErrorContainer.children[0].innerHTML = "The name field is required.";
        }
    else {
        nameErrorContainer.children[0].innerHTML = `${max_length- nameValue.length} characters left`;
    }

})

mobileNumberInput?.addEventListener('input', ()=> {
    let mobileNumberValue = mobileNumberInput.value;
    console.log(mobileNumberValue) 
    let required_length = 10;   
    if (!/^[0-9]*$/.test(mobileNumberValue)) {
        mobileNumberErrorContainer.children[0].innerHTML = "Should contain only Numbers.";
        }
    else if (!mobileNumberValue) {
        mobileNumberErrorContainer.children[0].innerHTML = "This field is required.";
        }
    else if (mobileNumberValue.length !== required_length) {
        mobileNumberErrorContainer.children[0].innerHTML = `${required_length - mobileNumberValue.length} digits left`;
    }
    else {
        mobileNumberErrorContainer.children[0].innerHTML = ``;
    }

})


rollNumberInput?.addEventListener('input', ()=> {
    let rollNumberValue = rollNumberInput.value;
    console.log(rollNumberValue) 
    let required_length = 10;  
    // \d{2}K8[15]A 
    // /\d{2}K8[15]A/

    if (rollNumberValue.length !== required_length) {
            rollNumberErrorContainer.children[0].innerHTML = `${required_length - rollNumberValue.length} characters left`;
        }
   
    else if (!rollNumberValue) {
        rollNumberErrorContainer.children[0].innerHTML = "This field is required.";
        }
    else {
        rollNumberErrorContainer.children[0].innerHTML = ``;
    }

    if (!/\d{2}K8[15]A/.test(rollNumberValue)) {
        rollNumberErrorContainer.children[1].innerHTML = "The Roll number is not valid";
    }
    else{
        rollNumberErrorContainer.children[1].innerHTML = ``;
    }

})
