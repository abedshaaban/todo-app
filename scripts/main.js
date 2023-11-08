// load tasks from local storage
if (typeof Storage !== "undefined") {
  const savedTasks = JSON.parse(localStorage.getItem("tasks-list"));

  console.log(savedTasks);

  const feed = document.getElementById("feed");

  if (savedTasks == null) {
    feed.innerHTML = "<p>you don't have any tasks</p>";
  } else {
    feed.innerHTML = "";

    for (let i = 0; i < savedTasks.length; i++) {
      const task = savedTasks[i];

      feed.innerHTML += `<div id="${task?.id}" class="task flex-row">
    <div class="drag-task-handler center pointer">
      <img src="./public/drag-handle-dots.svg" alt="" />
    </div>

    <div class="task-content flex-col">
      <div class="task-head flex-row">
        <h2>${task?.title}</h2>

        <div class="task-head-actions flex-row">
          <span class="task-head-actions-priority ${
            task?.priority == "High"
              ? "priority-high"
              : task?.priority == "Medium"
              ? "priority-medium"
              : "priority-low"
          }">
          ${task?.priority}
          </span>

          <span>${task?.dueDate}</span>

          <button class="task-head-actions-btn center bg-green">
            <img src="./public/check.svg" alt="check icon" />
          </button>

          <button class="task-head-actions-btn center bg-red">
            <img src="./public/trash.svg" alt="trash icon" />
          </button>
        </div>
      </div>

      <div class="task-description">
        <p>${task?.description}</p>
      </div>
    </div>
  </div>`;
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

function SaveTaskToLocalStorage(name, description, dueDate, priority) {
  if (typeof Storage === "undefined") return;

  const oldTasks = JSON.parse(localStorage.getItem("tasks-list"));

  const newTask = {
    id: new Date().valueOf(),
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
