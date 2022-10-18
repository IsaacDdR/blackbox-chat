import {
  appendMessage,
  renderMessages,
  fillForm,
  onHandleSubmit,
} from "./ui.js";
import { loadMessages, onNewMessage, onSelected } from "./sockets.js";

window.addEventListener("DOMContentLoaded", () => {
  loadMessages(renderMessages);
  onNewMessage(appendMessage);
  onSelected(fillForm);
});

const messageForm = document.querySelector("#messageForm");
messageForm.addEventListener("submit", onHandleSubmit);
