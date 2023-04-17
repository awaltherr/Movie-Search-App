const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const emailFormat = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

contactForm.addEventListener('submit', (e) => {
    formValidation();

    if(submitForm() == true) {
        contactForm.submit();
    } else {
        e.preventDefault();
    }
})

const submitForm = () => {
    const inputContainers = contactForm.querySelectorAll('.form-control');
    let validInputs = true

    inputContainers.forEach((container) => {
        if(container.classList.contains('error')) {
            validInputs = false;
        }
    })
    return validInputs;
}

const formValidation = () => {
    if(nameInput.value.trim() == '') {
        setError(nameInput, 'Vänligen ange ditt namn')
    } else {
        setValid(nameInput)
    } 
    
    if(emailInput.value.trim() == '') {
        setError(emailInput, 'Vänligen ange en email-adress')
    } else if(!emailInput.value.match(emailFormat)) {
        setError(emailInput, 'Vänligen ange en giltig email-adress')
    } else {
        setValid(emailInput)
    }

    if(messageInput.value.trim().length < 30) {
        setError(messageInput, 'Meddelandet måste innehålla minst 30 tecken')
    } else {
        setValid(messageInput)
    }
}

const setError = (inputElement, message) => {
    const parentOfError = inputElement.parentElement;
    if(parentOfError.classList.contains('success')) {
        parentOfError.classList.remove('success')
    }
    parentOfError.classList.add('error');

    const helperMessage = parentOfError.querySelector('p')
    helperMessage.textContent = message
}

const setValid = (inputElement) => {
    const parentOfError = inputElement.parentElement;
    if(parentOfError.classList.contains('error')) {
        parentOfError.classList.remove('error')
    }
    parentOfError.classList.add('success')

}







