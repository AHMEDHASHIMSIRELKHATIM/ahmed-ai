const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const WORKER_URL = "https://ahmed-ai.ahmedoxdox10.workers.dev/";

async function sendMessage() {
    const message = input.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");
    input.value = "";

    const thinkingMessage = addMessage("Thinking... 🤔", "bot");

    try {
        const response = await fetch(WORKER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        if (!response.ok) {
            throw new Error(`Worker returned ${response.status}`);
        }

        const data = await response.json();

        thinkingMessage.remove();

        const reply =
            data.reply ||
            data.message ||
            data.response ||
            "I didn't receive a response from the AI.";

        addMessage(reply, "bot");

    } catch (error) {
        console.error("Ahmed AI Error:", error);

        thinkingMessage.remove();

        addMessage(
            "Sorry 😕 I couldn't connect to Ahmed AI right now. Please try again.",
            "bot"
        );
    }
}

function addMessage(text, type) {
    const message = document.createElement("div");
    message.classList.add("message");

    if (type === "user") {
        message.classList.add("user-message");

        message.innerHTML = `
            <div class="message-text">
                ${escapeHTML(text)}
            </div>
        `;
    } else {
        message.classList.add("bot-message");

        message.innerHTML = `
            <div class="avatar">A</div>
            <div class="message-text">
                ${escapeHTML(text)}
            </div>
        `;
    }

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;

    return message;
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
