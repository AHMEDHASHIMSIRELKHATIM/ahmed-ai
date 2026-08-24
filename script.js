const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

function sendMessage() {

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Add user message
    addMessage(message, "user");

    // Clear input
    input.value = "";

    // Temporary AI reply
    setTimeout(() => {

        let reply = getAIResponse(message);

        addMessage(reply, "bot");

    }, 600);
}


function addMessage(text, type) {

    const message = document.createElement("div");

    message.classList.add("message");

    if (type === "user") {

        message.classList.add("user-message");

        message.innerHTML = `
            <div class="message-text">
                ${text}
            </div>
        `;

    } else {

        message.classList.add("bot-message");

        message.innerHTML = `
            <div class="avatar">
                A
            </div>

            <div class="message-text">
                ${text}
            </div>
        `;
    }

    chatBox.appendChild(message);

    // Scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}


/*
    Temporary AI brain
    We will replace this with a real AI API later.
*/

function getAIResponse(message) {

    const text = message.toLowerCase();

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {
        return "Hello 👋 I'm Ahmed AI. How can I help you today?";
    }

    if (text.includes("who are you")) {
        return "I'm Ahmed AI 🤖, your personal AI assistant.";
    }

    if (text.includes("how are you")) {
        return "I'm doing great 😎. Thanks for asking!";
    }

    if (
        text.includes("thank you") ||
        text.includes("thanks")
    ) {
        return "You're welcome! ❤️";
    }

    if (text.includes("bye")) {
        return "See you later 👋. Take care!";
    }

    return "That's interesting 🤔. I'm still learning. Soon I'll be able to give you much smarter answers.";
}


/*
    Press Enter to send
*/

input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});