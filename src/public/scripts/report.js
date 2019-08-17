const emailBox = document.getElementById('email');
const subjectSelect = document.getElementById('subject');
const issueBox = document.getElementById('issue');
const sendButton = document.getElementById('send-btn');

sendButton.disabled = true; // sendButton initially disabled

function enableButton() {
    if (issueBox.value.length > 0 && subjectSelect.value != "Select Option" && emailBox.value.length > 0) {
        sendButton.disabled = false
    } else if (issueBox.value.length == 0 || subjectSelect.value == "Select Option" || emailBox.value.length == 0) {
        sendButton.disabled = true
    }
}

emailBox.addEventListener('input', event => {
    enableButton()
});

subjectSelect.addEventListener("click", event => {
    enableButton()
});

issueBox.addEventListener('input', event => {
    enableButton()
});

sendButton.addEventListener('click', event => {
    enableButton()
});