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

function SaveTaskToLocalStorage(name, description, dueDate, priority) {
  if (typeof Storage === "undefined") return;

  const oldTasks = JSON.parse(localStorage.getItem("tasks-list"));

  const newTask = {
    title: name,
    description: description,
    dueDate: dueDate,
    priority: priority,
    isCompleted: false,
  };

  if (oldTasks != null) {
    localStorage.setItem("tasks-list", JSON.stringify([newTask, ...oldTasks]));
  } else {
    localStorage.setItem("tasks-list", JSON.stringify([newTask]));
  }
}
