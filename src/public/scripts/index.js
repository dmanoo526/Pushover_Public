const tosCheckbox = document.getElementById('tos');
const signupBtn = document.getElementById('signup-btn');
const signupForm = document.getElementById('signup-form');
const verify = document.getElementById('verify');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirm-password')

verify.style.visibility = "hidden"; // verify initially invisible
signupBtn.disabled = true; // signupBtn initially disabled

function enableButton(tosCheckBox) {
    if (tosCheckbox.checked) {
        signupBtn.disabled = false;
    } else {
        signupBtn.disabled = true;
    }
}

tosCheckbox.addEventListener('change', (event) => {
    enableButton(tosCheckbox)
});

signupBtn.addEventListener('click', (event) => {

    var emailInput = document.getElementById('email').value;
    var passInput = document.getElementById('password').value;
    var confirmPassInput = document.getElementById('confirm-password').value;

    if (passInput != confirmPassInput) {
        verify.style.visibility = "visible"
        event.preventDefault()
    } else {
        enableButton(tosCheckbox)
    }
});

password.addEventListener('input', event => {
    enableButton(tosCheckbox)
    verify.style.visibility = "hidden"
});

confirmPass.addEventListener('input', event => {
    enableButton(tosCheckbox)
    verify.style.visibility = "hidden"
});