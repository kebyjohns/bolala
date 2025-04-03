function displayResponses() {
    let responseList = document.getElementById("response-list");
    responseList.innerHTML = "";

    let chatbotData = JSON.parse(localStorage.getItem("chatbotData")) || {};

    for (let key in chatbotData) {
        let li = document.createElement("li");
        li.textContent = `"${key}" → "${chatbotData[key]}"`;
        responseList.appendChild(li);
    }
}

function updateResponse() {
    let question = document.getElementById("question").value.trim().toLowerCase();
    let response = document.getElementById("response").value.trim();

    if (question && response) {
        let chatbotData = JSON.parse(localStorage.getItem("chatbotData")) || {};
        chatbotData[question] = response;
        localStorage.setItem("chatbotData", JSON.stringify(chatbotData));
        displayResponses();

        // Remove from unanswered questions if present
        let unanswered = JSON.parse(localStorage.getItem("unansweredQuestions")) || [];
        unanswered = unanswered.filter(q => q !== question);
        localStorage.setItem("unansweredQuestions", JSON.stringify(unanswered));
        displayUnansweredQuestions();
    }
}

function displayUnansweredQuestions() {
    let unansweredList = document.getElementById("unanswered-list");
    unansweredList.innerHTML = "";

    let unanswered = JSON.parse(localStorage.getItem("unansweredQuestions")) || [];

    if (unanswered.length === 0) {
        unansweredList.innerHTML = "<li>No unanswered questions.</li>";
    } else {
        unanswered.forEach(q => {
            let li = document.createElement("li");
            li.textContent = q;
            unansweredList.appendChild(li);
        });
    }
}

function displayContactMessages() {
    let contactList = document.getElementById("contact-messages-list");
    contactList.innerHTML = "";

    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

    if (messages.length === 0) {
        contactList.innerHTML = "<li>No contact messages.</li>";
    } else {
        messages.forEach(msg => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${msg.name} (${msg.email}):</strong> ${msg.message}`;
            contactList.appendChild(li);
        });
    }
}

window.onload = function () {
    displayResponses();
    displayUnansweredQuestions();
    displayContactMessages();
}