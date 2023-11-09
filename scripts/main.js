import {
  SaveTaskToLocalStorage,
  addCompleteTaskEventListeners,
  addDeleteEventListeners,
  removeCompleteTaskEventListeners,
  removeDeleteEventListeners,
  addEditEventListeners,
  removeEditEventListeners,
  addEventListenerToDragAndDropTasks,
  removeEventListenerToDragAndDropTasks,
} from "./utilities.js";
import { getFormat } from "./taskTag.js";

// load tasks from local storage
if (typeof Storage !== "undefined") {
  const savedTasks = JSON.parse(localStorage.getItem("tasks-list"));

  const feed = document.getElementById("feed");

  if (savedTasks == null || savedTasks.length == 0) {
    feed.innerHTML = "<p>you don't have any tasks</p>";
  } else {
    feed.innerHTML = "";

    for (let i = 0; i < savedTasks.length; i++) {
      const task = savedTasks[i];

      feed.innerHTML += getFormat(
        task?.id,
        task?.title,
        task?.description,
        task?.dueDate,
        task?.priority,
        task?.isCompleted
      );
    }
  }
}

// show-hide input text
const openButton = document.querySelector("[open-data-modal]");
const closeButton = document.querySelector("[close-data-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

// get submit and handle submit task
const submitButton = document.getElementById("form-task");

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskTitle = document.getElementById("task-title");
  const taskDescription = document.getElementById("task-description");
  const taskDueDate = document.getElementById("task-due-date");
  const taskPriority = document.getElementById("task-priority");

  let taskTitleValue = taskTitle.value;
  let taskDescriptionValue = taskDescription.value;
  let taskDueDateValue = taskDueDate.value;
  let taskPriorityValue = taskPriority.value;

  SaveTaskToLocalStorage(
    taskTitleValue,
    taskDescriptionValue,
    taskDueDateValue,
    taskPriorityValue
  );

  taskTitle.value = "";
  taskDescription.value = "";
  taskDueDate.value = "";
  taskPriority.value = "";

  modal.close();
});

addCompleteTaskEventListeners();
addDeleteEventListeners();
addEditEventListeners();
addEventListenerToDragAndDropTasks();

// search bar events
const searchInput = document.getElementById("search-bar-input");
const searchClear = document.getElementById("clear-search-bar-cross-icon");

searchClear.addEventListener("click", () => {
  const tasksTitleList = document.querySelectorAll("h2");

  searchInput.value = "";

  tasksTitleList.forEach((task) => {
    task.parentNode.parentNode.parentNode.style.display = "";
  });
});

searchInput.addEventListener("input", () => {
  const targetedSearch = searchInput.value.toLowerCase();
  const tasksTitleList = document.querySelectorAll("h2");
  const tasksDescriptionList = document.querySelectorAll("p");

  tasksTitleList.forEach((task, i) => {
    if (
      tasksTitleList[i].textContent.toLowerCase().includes(targetedSearch) ||
      tasksDescriptionList[i].textContent.toLowerCase().includes(targetedSearch)
    ) {
      task.parentNode.parentNode.parentNode.style.display = "";
    } else {
      task.parentNode.parentNode.parentNode.style.display = "none";
    }
  });
});

// check for task creation and rerun event listeners
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.nodeName === "SECTION") {
      removeCompleteTaskEventListeners();
      removeDeleteEventListeners();
      removeEditEventListeners();

      addCompleteTaskEventListeners();
      addDeleteEventListeners();
      addEditEventListeners();
    }
  });
});

mutationObserver.observe(document.getElementById("feed"), {
  attributes: true,
  childList: true,
});
