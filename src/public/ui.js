import {
  deleteMessage,
  getMessageById,
  saveMessage,
  updateMessage,
} from "./sockets.js";

const messagesList = document.querySelector("#messages");
const title = document.querySelector("#title");

let savedId = "";

const messageUI = (message) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 mb-2">
      <div class="d-flex justify-title-between">
          <h1 class="card-title h3">${message.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${message._id}">delete</button>
              <button class="btn btn-secondary update" data-id="${message._id}">update</button>
          </div>
      </div>
  </div>
`;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () =>
    deleteMessage(btnDelete.dataset.id)
  );
  btnUpdate.addEventListener("click", () =>
    getMessageById(btnDelete.dataset.id)
  );

  return div;
};

export const renderMessages = (messages) => {
  savedId = "";
  messagesList.innerHTML = "";
  messages.forEach((message) => messagesList.append(messageUI(message)));
};

export const appendMessage = (message) => {
  messagesList.append(messageUI(message));
};

export const fillForm = (message) => {
  title.value = message.title;

  savedId = message._id;
};

export const onHandleSubmit = (e) => {
  e.preventDefault();
  if (savedId) {
    updateMessage(savedId, title.value);
  } else {
    saveMessage(title.value);
  }

  title.value = "";
};
