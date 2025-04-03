// Load chatbot responses or set default ones
let chatbotData = JSON.parse(localStorage.getItem("chatbotData")) || {
    "hello": "Hi there!",
    "how are you": "I'm just a bot, but I'm doing great!",
    "bye": "Goodbye! Have a nice day!",
    "what is your name": "I'm a simple chatbot."
};

// Check if user is logged in
function checkUser() {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("chat-container").style.display = "block";
        document.getElementById("user-name").innerText = loggedInUser;
    } else {
        document.getElementById("auth-container").style.display = "block";
        document.getElementById("chat-container").style.display = "none";
    }
}

checkUser(); // Run on page load

// Sign Up Function
function signUp() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    
    if (!username || !password) {
        document.getElementById("auth-message").innerText = "Please enter a username and password.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        document.getElementById("auth-message").innerText = "Username already exists!";
    } else {
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("auth-message").innerText = "Sign-up successful! You can now login.";
    }
}

// Login Function
function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        checkUser(); // Reload to show chat interface
    } else {
        document.getElementById("auth-message").innerText = "Invalid username or password.";
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    checkUser(); // Reload to show login form
}

// Send message function
function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    let chatBox = document.getElementById("chat-box");

    // Display user message
    let userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);

    // Get bot response
    let botResponse = getBotResponse(userInput);

    // Display bot response
    let botMessage = document.createElement("div");
    botMessage.className = "chat-message bot";
    botMessage.innerText = botResponse;
    chatBox.appendChild(botMessage);

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// ✅ Get bot response (with admin and backup support)
function getBotResponse(input) {
    input = input.toLowerCase();

    // 1. Check chatbotData
    let response = chatbotData[input];
    if (response) {
        return response;
    }

    // 2. Check admin-defined backup answers
    let adminResponse = getAdminResponse(input);
    if (adminResponse) {
        return translateToHaitianCreole(adminResponse);
    }

    // 3. Log as unanswered & use web fallback
    logUnansweredQuestion(input);
    return fetchWebResponse(input);
}

// ✅ Log unanswered question
function logUnansweredQuestion(question) {
    let unanswered = JSON.parse(localStorage.getItem("unansweredQuestions")) || [];

    if (!unanswered.includes(question)) {
        unanswered.push(question);
        localStorage.setItem("unansweredQuestions", JSON.stringify(unanswered));
    }
}

// ✅ Admin-defined backup responses
function getAdminResponse(query) {
    const adminResponses = {
        "hello": "Hello, how can I assist you today?",
        "how are you": "I am doing great! Thanks for asking.",
        "bye": "Goodbye! Take care!",
        "what is your name": "I'm your friendly chatbot assistant."
    };

    return adminResponses[query];
}

// ✅ Fallback web response (placeholder)
function fetchWebResponse(query) {
    return "Ou sot konsa ou pa wont, nou pagen repons sa non lot fwa nap mete li pou ou .";
}

