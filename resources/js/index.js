
const nameInput = document.querySelector(`#my-name-input`);
const messageInput = document.querySelector(`#my-message-input`);
const sendButton = document.querySelector(`#send-button`);
const chatBox = document.querySelector(`#chat`);

let messages;

const formatMessage = message => {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
  if (message.sender == nameInput.value) {
    const messageDiv = `
      <div class="mine messages">
        <div class="message">${message.text}</div>
      </div>
    `;
    return messageDiv;
  } else {
    const messageDiv = `
      <div class="yours messages">
        <div class="message">${message.text}</div>
        <div class="sender-info">${message.sender} ${formattedTime}</div>
      </div>
    `;
    return messageDiv;
  }
};

const fetchMessages = async () => {
  const response = await fetch(`https://it3049c-chat.fly.dev/messages`);
  const data = await response.json();
  console.log(data);
  return data;

};

const updateMessagesInChatBox = async () => {
  const messages = await fetchMessages();
  for (const message of messages) {
    chatBox.innerHTML += formatMessage(message);
  }
};

const sendMessage = async (username, text) => {
  const message = {
    id: Math.floor(Math.random() * 1000),
    text: text,
    sender: username,
    timestamp: new Date().toISOString()
  };
  const response = await fetch(`https://it3049c-chat.fly.dev/messages`, {
    method: `POST`,
    headers: {
      "Content-Type": `application/json`
    },
    body: JSON.stringify(message)
  });
  updateMessagesInChatBox();
};

sendButton.addEventListener(`click`, async () => {
  await sendMessage(nameInput.value, messageInput.value
  );
  messageInput.value = ``;
  console.log(`button clicked`);
  updateMessagesInChatBox();
});


const MILLISECONDS_IN_TEN_SECONDS = 10000;
updateMessagesInChatBox();
setInterval(updateMessagesInChatBox, MILLISECONDS_IN_TEN_SECONDS);
